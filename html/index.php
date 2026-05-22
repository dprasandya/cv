<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);

session_name('SPIApp');
session_start();
session_cache_limiter('private');
define('_SPIEXEC', 1);

if(isset($_SESSION['hooks'])){
	unset($_SESSION['hooks']);
}

//include_once('classes/Mobile_Detect.php');
//$mobile = new Mobile_Detect();

$mDebug = false;
//if($mobile->isMobile() || $mDebug){
//	header('Location: _aire/?site='.$site);
//}else{
	/**
	 * Startup the registry
	 * This contains SESSION Variables to use in the application
	 * and mobile_detect class is used to detect mobile browsers.
	 */
	include_once('registry.php');
	
	/**
	 * Make the auth process
	 * lets check for 4 things to allow the user in
	 * 1. $_SESSION['user'] is set (this helps to app clean of PHP NOTICES)
	 * 2. $_SESSION['user']['auth'] is true (check if the user is authorized)
	 * 3. $_SESSION['user']['site'] is $site ($site == $_GET['site] or 'default')
	 * 4. $_SESSION['inactive']['life'] is less than $_SESSION['inactive']['time']
	 * (to make sure ths user hasn't been out for a long time)
	 *
	 */
	if(isset($_SESSION['user']) && $_SESSION['user']['auth'] == true && $_SESSION['user']['site'] == $site && $_SESSION['inactive']['life'] < $_SESSION['inactive']['time']){
		/**
		 * if mobile go to mobile app, else go to app
		 */
        $_SESSION['install'] = false;
//		if(isset($_SESSION['site']['checkInMode']) && $_SESSION['site']['checkInMode']){
//			include_once('checkin/checkin.php');
//		} else {
			if(isset($_REQUEST['dual']) && $_REQUEST['dual']){
				include_once('_dual.php');
			}else{
				include_once('_app.php');
			}
//		}
	} else { // Make the logon process or Setup process
		/**
		 * If no directory is found inside sites dir run the setup wizard,
		 * if a directory is found inside sites dir run the logon screen
		 */
		if(sites_count == 0){
			unset($_SESSION['site']);
            $_SESSION['install'] = true;
			include_once('_install.php');
		} else {
			$_SESSION['user']['auth'] = false;
            $_SESSION['install'] = false;
			include_once('_login.php');
		}
	}
//}
$_SESSION['inactive']['timeout'] = time();


