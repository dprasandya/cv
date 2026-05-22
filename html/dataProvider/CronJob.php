<?php

include_once(ROOT . '/classes/Sessions.php');

class CronJob {

	function run() {
		/**
		 * only run cron if delay time has expired
		 */
		error_reporting(-1);
		if((time() - $_SESSION['cron']['time']) > $_SESSION['cron']['delay'] || $_SESSION['inactive']['start']){
			/**
			 * stuff to run
			 */
//			$s = new Sessions();
//			$p = new Patient();
//
//			foreach($s->logoutInactiveUsers() as $user){
//				$p->patientChartInByUserId($user['uid']);
//			}

			/**
			 * set cron start to false reset cron time to current time
			 */
			$_SESSION['inactive']['start'] = false;
			$_SESSION['cron']['time'] = time();
			return array(
				'success' => true,
				'ran' => true
			);
		}
		return array(
			'success' => true,
			'ran' => false
		);
	}

}

//$foo = new CronJob();
//print '<pre>';
//$foo->run();
