<?php

/**
 * This class is for testing,
 * Is an easy way to test and run Ext.Direct methods
 * from the browser console.
 *
 * Class Test
 */
class Test {


	/**
	 * Method with no arguments
	 * @return array
	 */
	public function t1(){
		$msg = 'Hello World!';

		return array('message' => $msg);
	}

	/**
	 * Methods with arguments
	 * @param $params
	 * @return mixed
	 */
	public function t2($params){
		$params->msg = 'Hello World!';

		return $params;
	}
}