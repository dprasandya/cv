<?php

if (!isset($_SESSION))
{
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}
print '<pre>';
print_r($_SESSION);