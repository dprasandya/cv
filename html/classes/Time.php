<?php

if (!isset($_SESSION))
{
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}

class Time
{
	public static function getLocalTime($format = 'Y-m-d H:i:s')
	{
			return date($format, time());
	}

}
