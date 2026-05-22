<?php
if(!isset($_SESSION)){
	@session_name('SPIApp');
	@session_start();
	@session_cache_limiter('private');
}
$site = isset($_SESSION['user']['site']) ? $_SESSION['user']['site'] : 'default';
if(!defined('_SPIEXEC'))
	define('_SPIEXEC', 1);
require_once(str_replace('\\', '/', dirname(dirname(__FILE__))) . '/registry.php');
$conf = ROOT . '/sites/' . $site . '/conf.php';
if(file_exists($conf)){
	require_once(ROOT . '/sites/' . $site . '/conf.php');
//	require_once(ROOT . '/classes/MatchaHelper.php');
}
//require_once(ROOT . '/classes/MatchaHelper.php');
include_once(ROOT . '/dataProvider/Modules.php');
include_once(ROOT . '/dataProvider/ACL.php');
include_once(ROOT . '/dataProvider/Globals.php');
require('config.php');

if(isset($_SESSION['install']) && $_SESSION['install'] != true){
	$modules = new Modules();
	$API = array_merge($API, $modules->getEnabledModulesAPI());
}

class BogusAction {
	public $action;
	public $method;
	public $data;
	public $tid;
	public $module;
}

$isForm = false;
$isUpload = false;
$module = null;
$data = file_get_contents('php://input');

if(isset($data)){
	header('Content-Type: text/javascript');
	$data = json_decode($data);
	if(isset($_REQUEST['module'])){
		$module = $_REQUEST['module'];
	}
} else {
	if(isset($_POST['extAction'])){
		// form post
		$isForm = true;
		$isUpload = $_POST['extUpload'] == 'true';
		$data = new BogusAction();
		$data->action = $_POST['extAction'];
		$data->method = $_POST['extMethod'];
		$data->tid = isset($_POST['extTID']) ? $_POST['extTID'] : null;
		// not set for upload
		$data->data = array(
			$_POST,
			$_FILES
		);
		if(isset($_REQUEST['module']))
			$module = $_REQUEST['module'];

	} else {
		die('Invalid request.');
	}
}

function doRpc($cdata) {
	global $API, $module;
	try {
		if(!isset($API[$cdata->action])){
			throw new Exception('Call to undefined action: ' . $cdata->action);
		}
		$action = $cdata->action;
		$a = $API[$action];
        doAroundCalls($a['before'], $cdata);
		$method = $cdata->method;
		$mdef = $a['methods'][$method];
		if(!$mdef){
			throw new Exception("Call to undefined method: $method on action $action");
		}
        doAroundCalls($mdef['before'], $cdata);
		$r = array(
			'type' => 'rpc',
			'tid' => $cdata->tid,
			'action' => $action,
			'method' => $method
		);
		if(isset($module)){
			require_once(ROOT . "/modules/$module/dataProvider/$action.php");
			$action = "\\modules\\$module\\dataProvider\\$action";
			$o = new $action();
		} else {
			require_once(ROOT . "/dataProvider/$action.php");
			$o = new $action();
		}

		if(isset($mdef['len'])){
			$params = isset($cdata->data) && is_array($cdata->data) ? $cdata->data : array();

		} else {
			$params = array($cdata->data);
		}

		if(isset($_SESSION['hooks']) && isset($_SESSION['hooks'][$action][$method]['Before'])){
			foreach($_SESSION['hooks'][$action][$method]['Before']['hooks'] as $i => $hook){
				include_once($hook['file']);
				$Hook = new $i();
				$params = array(call_user_func_array(array($Hook, $hook['method']), $params));
				unset($Hook);
			}
		}

        $r['result'] = call_user_func_array(array($o, $method), $params);

        doAroundCalls($mdef['after'], $cdata, $r);
        doAroundCalls($a['after'], $cdata, $r);
		unset($o);

		if(isset($_SESSION['hooks']) && isset($_SESSION['hooks'][$action][$method]['After'])){
			foreach($_SESSION['hooks'][$action][$method]['After']['hooks'] as $i => $hook){
				include_once($hook['file']);
				$Hook = new $i();
				$r['result'] = call_user_func(array($Hook, $hook['method']), $r['result']);
				unset($Hook);
			}
		}

	} catch(Exception $e) {
		$r['type'] = 'exception';
		$r['message'] = $e->getMessage();
		$r['where'] = $e->getTraceAsString();
	}
	//    $_SESSION['server']['last_tid'] = $cdata->tid;
	return $r;
}

function doAroundCalls(&$fns, &$cdata, &$returnData = null)
{
    if(!$fns){
        return;
    }
    if(is_array($fns)){
        foreach($fns as $f){
            $f($cdata, $returnData);
        }
    } else {
        $fns($cdata, $returnData);
    }
}
function utf8_encode_deep(&$input) {
	if (is_string($input)) {
		$input = utf8_encode($input);
	} else if (is_array($input)) {
		foreach ($input as &$value) {
			utf8_encode_deep($value);
		}
		unset($value);
	} else if (is_object($input)) {
		$vars = array_keys(get_object_vars($input));
		foreach ($vars as $var) {
			utf8_encode_deep($input->$var);
		}
	}
}

$response = null;
if(is_array($data)){
	$response = array();
	foreach($data as $d){
		$response[] = doRpc($d);
	}
} else {
	$response = doRpc($data);
}

utf8_encode_deep($response);

if($isForm && $isUpload){
	print '<html><body><textarea>';
	$json = htmlentities(json_encode($response), ENT_NOQUOTES | ENT_SUBSTITUTE , 'UTF-8');
	$json  = mb_convert_encoding($json, 'UTF-8', 'UTF-8');
	print $json;
	print '</textarea></body></html>';
}else {
	header('Content-Type: application/json; charset=utf-8');
	$json = htmlentities(json_encode($response), ENT_NOQUOTES | ENT_SUBSTITUTE , 'UTF-8');
	$json  = mb_convert_encoding($json, 'UTF-8', 'UTF-8');
	print $json;
}

//Matcha::$__conn = null;