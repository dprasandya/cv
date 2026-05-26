<?php

$_SESSION['site']['db']['type'] = 'firebird';
$_SESSION['site']['db']['host'] = 'firebird';
$_SESSION['site']['db']['port'] = '3050';
$_SESSION['site']['db']['username'] = 'SYSDBA';
$_SESSION['site']['db']['password'] = 'masterkey';
$_SESSION['site']['db']['database'] = '/firebird/data/hga.fdb';

/**
 * AES Key
 * 256bit - key
 */
if(!defined('site_aes_key')) define('site_aes_key', 'xf7t2up0iciatq5uv58xtxo5qagsqymd');

/**
 * Default site language and theme
 * Check if the localization variable already has a value, if not pass the 
 * default language.
 */
if(!defined('site_name')) define('site_name', 'HGA');
if(!defined('site_theme')) define('site_theme', 'ext-all');
if(!defined('site_timezone')) define('site_timezone', 'Asia/Jakarta');
if(!defined('site_default_localization')) define('site_default_localization', 'en_US');
if(!defined('site_id')) define('site_id', basename(dirname(__FILE__)));
if(!defined('site_dir')) define('site_dir', site_id);
if(!defined('site_url')) define('site_url', URL .'/sites/'.site_id);
if(!defined('site_path')) define('site_path', str_replace('\\', '/', dirname(__FILE__)));
if(!defined('site_temp_url')) define('site_temp_url', site_url .'/temp');
if(!defined('site_temp_path')) define('site_temp_path', site_path . '/temp');
