<?php

include_once(ROOT . '/classes/Sessions.php');
include_once(ROOT . '/classes/Crypt.php');

class authProcedures {

    private $session;

    function __construct(){
        $this->session = new Sessions();
    }

    /**
     * @param stdClass $params
     * @return int
     */
    public function login(stdClass $params){
        //error_reporting(E_ALL);
        //-------------------------------------------
        // Check that the username do not pass
        // the maximum limit of the field.
        //
        // NOTE:
        // If this condition is met, the user did not
        // use the logon form. Possible hack.
        //-------------------------------------------
        if(strlen($params->authUser) >= 26){
            return array('success' => false, 'type' => 'error', 'message' => 'Possible hack, please use the Logon Screen.');
        }
        //-------------------------------------------
        // Check that the username do not pass
        // the maximum limit of the field.
        //
        // NOTE:
        // If this condition is met, the user did not
        // use the logon form. Possible hack.
        //-------------------------------------------
        if(strlen($params->authPass) >= 15){
            return array('success' => false, 'type' => 'error', 'message' => 'Possible hack, please use the Logon Screen.');
        }
        //-------------------------------------------
        // Simple check username
        //-------------------------------------------
        if(!$params->authUser){
            return array('success' => false, 'type' => 'error', 'message' => 'The username field can not be in blank. Try again.');
        }
        //-------------------------------------------
        // Simple check password
        //-------------------------------------------
        if(!$params->authPass){
            return array('success' => false, 'type' => 'error', 'message' => 'The password field can not be in blank. Try again.');
        }
        //-------------------------------------------
        // Find the AES key in the selected site
        // And include the rest of the remaining
        // variables to connect to the database.
        //-------------------------------------------
        //define('_SPIEXEC', 1);
        chdir(ROOT);
        include_once ('registry.php');
        include_once ('classes/AES.php');
        include_once ('classes/dbHelper.php');
        $fileConf = 'sites/' . $params->site . '/conf.php';


        if(file_exists($fileConf)){
            /** @noinspection PhpIncludeInspection */
            include_once ($fileConf);
            $db  = new dbHelper();
            $err = $db->getError();
            if(!is_array($err)){
                return array(
                    'success' => false, 'type' => 'error', 'message' => 'For some reason, I can\'t connect to the database.'
                );
            }
            // Do not stop here!, continue with the rest of the code.
        } else {
            return array(
                'success' => false, 'type' => 'error', 'message' => 'No configuration file found for site <span style="font-weight:bold">' . $params->site . '</span>.<br>Please double check URL or contact support desk.'
            );
        }

        //-------------------------------------------
        // remove empty spaces single and double quotes from username and password
        //-------------------------------------------
        $params->authUser = trim(str_replace(array('\'', '"'), '', $params->authUser));
        $params->authPass = trim(str_replace(array('\'', '"'), '', $params->authPass));

        //-------------------------------------------
        // Username & password match
        //-------------------------------------------
        //-------------------------------------------
        // Convert the password to AES and validate
        //-------------------------------------------
        //$aes = new AES(site_aes_key);
        //-------------------------------------------
        // Username & password match
        //-------------------------------------------
        $db->setSQL("SELECT FIRST 1 id, usrname, fname, lname, email, passwd, hashpasswd, aktif, authorized, co_id, level, role_id
                         FROM users
        		        WHERE usrname   = '$params->authUser'
        		          AND authorized = 1");
        $user = $db->fetchRecord();
        $user = array_change_key_case($user);
        // $sql = "select * from users";
        //     $db->setSQL($sql);
        //     foreach ($db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
        //         $row = array_change_key_case($row);
        //         $sqlupdate = "update users set hashpasswd = '".password_hash($row['plaintext'], PASSWORD_BCRYPT, ['cost' => 10])."' where id = ".$row['id'];
        //         //$sqlupdate = "update users set plaintext = '".$aes->decrypt($row['passwd'])."' where id = ".$row['id'];
        //         //print_r($sqlupdate);
        //         $db->setSQL($sqlupdate);
        //         $db->execOnly();
        //     }

        if(!password_verify($params->authPass, $user['hashpasswd'])){
        //if($params->authPass != $aes->decrypt($user['passwd'])){
            
            return array(
                //'success' => false, 'type' => 'error', 'message' => $aes->decrypt($user['passwd'])
                'success' => false, 'type' => 'error', 'message' => 'User & Password not Valid'
            );
        } else{
            //-------------------------------------------
            // Change some User related variables and go
            //-------------------------------------------
            $_SESSION['user']['name'] = trim($user['fname'] . ' ' . $user['lname']);
            $_SESSION['user']['usrname'] = $user['usrname'];
            $_SESSION['user']['id'] = $user['id'];
            $_SESSION['user']['email'] = $user['email'];
            $_SESSION['user']['localization'] = $params->lang;
            $_SESSION['user']['site'] = $params->site;
            $_SESSION['user']['auth'] = true;
            //-------------------------------------------
            // Also fetch the current version of the
            // Application & Database
            //-------------------------------------------
//			$sql = "SELECT * FROM version LIMIT 1";
//			$db->setSQL($sql);
//			$version = $db->fetchRecord();
//			$_SESSION['ver']['codeName'] = $version['v_tag'];
//			$_SESSION['ver']['major'] = $version['v_major'];
//			$_SESSION['ver']['rev'] = $version['v_patch'];
//			$_SESSION['ver']['minor'] = $version['v_minor'];
//			$_SESSION['ver']['database'] = $version['v_database'];
            $_SESSION['site']['localization'] = $params->lang;
            $_SESSION['timeout'] = time();
            $session                          = new Sessions();
            $_SESSION['user']['token'] = Crypt::encrypt('{"uid":'.$user['id'].',"sid":'.$session->loginSession().',"site":"'.$params->site.'"}');
            $_SESSION['inactive']['timeout'] = time();

            unset($db);

            return array(
                'success' => true,
                'token' => $_SESSION['user']['token'],
                'user' => array(
                    'id' => $_SESSION['user']['id'],
                    'name' => $_SESSION['user']['name'],
                    'usrname' => $_SESSION['user']['usrname'],
                    'email' => $_SESSION['user']['email'],
                    'site' => $_SESSION['user']['site'],
                    'localization' => $params->lang
                )
            );
        }
    }

    /**
     * @static
     * @return mixed
     */
    public function unAuth(){
        $this->session->logoutSession();
        session_unset();
        session_destroy();
        return;
    }

    /**
     * @static
     * @return int
     */
    public function ckAuth(){
        //MatchaModel::setSenchaModel('App.model.patient.HCFAOptions');
//		if(!isset($_SESSION['site']['flops'])) $_SESSION['site']['flops'] = 0;
//		$_SESSION['site']['flops']++;
        //****************************************************************
        // If the session has passed 60 flops, with out any activity exit
        // the application.
        //
        // return an exit code
        //****************************************************************
        if(isset($_SESSION['session_id'])){
            $this->session->updateSession();
            return array('authorized' => true);

        } elseif(isset($_SESSION['session_id']) && (isset($_SESSION['user']) && !$_SESSION['user']['auth'])){
            $this->unAuth();
            return array('authorized' => false);

        }else{
            return array('authorized' => false);
        }
    }

    public function getSites(){
        $rows = array();
        foreach($_SESSION['sites']['sites'] as $row){
            $site['site_id'] = $row;
            $site['site'] = $row;
            array_push($rows, $site);
        }
        return $rows;
    }
    public function getUrl($params){
        $_SESSION['sites']['url'] = $params;
    }

}
