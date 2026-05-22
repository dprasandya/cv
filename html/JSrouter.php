<?php

if(!isset($_SESSION)){
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}
ob_start();
if(!defined('_SPIEXEC')) define('_SPIEXEC', 1);
require_once(dirname(__FILE__) . '/registry.php');
require_once(dirname(__FILE__) . '/sites/'.$_REQUEST['site'].'/conf.php');
require_once(dirname(__FILE__) . '/classes/dbHelper.php');
include_once(dirname(__FILE__) . '/dataProvider/i18nRouter.php');
include_once(dirname(__FILE__) . '/dataProvider/Globals.php');
header('Content-Type: text/javascript');

// Output the translation selected by the user.
$i18n = i18nRouter::getTranslation();
print 'lang = '. json_encode( $i18n ).';';



// Output all the globals settings on the database.
$global = Globals::setGlobals();
$global['root'] = ROOT;
$global['url']  = URL;
$global['host']  = HOST;
$global['site']  = site_dir;

print 'globals = '. json_encode( $global ).';';

if(!isset($_SESSION['site']['error']) && (isset($_SESSION['user']) && $_SESSION['user']['auth'] == true)){
	include_once(dirname(__FILE__) . '/dataProvider/ACL.php');
	include_once(dirname(__FILE__) . '/dataProvider/User.php');

	$ACL = new ACL();
	$perms = array();
	/*
	 * Look for user permissions and pass it to a PHP variable.
	 * This variable will be used in JavaScript code
	 * look at it as a PHP to JavaScript variable conversion.
	 */
	foreach($ACL->getAllUserPermsAccess() AS $perm){
		$perms[$perm['perm']] = $perm['value'];
	}
	unset($ACL);

	$User = new User();
	$userData = $User->getCurrentUserBasicData();
	$userData['token'] = $_SESSION['user']['token'];
	$userData['localization'] = $_SESSION['user']['localization'];
	unset($User);

	/*
	 * Pass all the PHP to JavaScript
	 */
	print 'window.acl = ' . json_encode($perms) . ';';
	print 'window.user = ' . json_encode($userData) . ';';
	print 'window.structure = ' . json_encode($structure) . ';';
	print 'window.settings.site_url = "' . $global['url'] . '";';

	if(isset($_SESSION['styles'])){
		print 'window.styles = ' . json_encode($_SESSION['styles']) . ';';
	}

}

