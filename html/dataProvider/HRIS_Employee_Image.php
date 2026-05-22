<?php

require_once ('../classes/pdo_database.class.php');
if(!defined('site_db_type')) define('site_db_type', 'firebird');
if(!defined('site_db_host')) define('site_db_host', 'localhost');
if(!defined('site_db_port')) define('site_db_port', '3050');
if(!defined('site_db_username')) define('site_db_username', 'sysdba');
if(!defined('site_db_password')) define('site_db_password', 'masterkey');
//if(!defined('site_db_database')) define('site_db_database', '/var/db/demo/spi.fdb');
if(!defined('site_db_database')) define('site_db_database', '/var/sites/Perkebunan-SSM/database/ssm.fdb');
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
if(!defined('site_name')) define('site_name', 'SSM');
if(!defined('site_theme')) define('site_theme', 'ext-all');
if(!defined('site_timezone')) define('site_timezone', 'Asia/Jakarta');
if(!defined('site_default_localization')) define('site_default_localization', 'en_US');
if(!defined('site_id')) define('site_id', basename(dirname(__FILE__)));
if(!defined('site_dir')) define('site_dir', site_id);
if(!defined('site_url')) define('site_url', URL .'/sites/'.site_id);
if(!defined('site_path')) define('site_path', str_replace('\\', '/', dirname(__FILE__)));
if(!defined('site_temp_url')) define('site_temp_url', site_url .'/temp');
if(!defined('site_temp_path')) define('site_temp_path', site_path . '/temp');

$site = site_name;
$dbtype = site_db_type;
$host = site_db_host;
$port = site_db_port;
$dbName = site_db_database;
$dbUser = site_db_username;
$dbPass = site_db_password;

$conn = new PDO("firebird:dbname=".$host.":".$dbName, $dbUser, $dbPass);
if($conn==false) die("Error: Cant connect to database.");
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$emp_id = $_POST['emp_id'];
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["image-upload"]["name"]);
$extension = end($temp);
if ((($_FILES["image-upload"]["type"] == "image/gif")
        || ($_FILES["image-upload"]["type"] == "image/jpeg")
        || ($_FILES["image-upload"]["type"] == "image/jpg")
        || ($_FILES["image-upload"]["type"] == "image/pjpeg")
        || ($_FILES["image-upload"]["type"] == "image/x-png")
        || ($_FILES["image-upload"]["type"] == "image/png"))
    && ($_FILES["image-upload"]["size"] < 3073000)
    && in_array($extension, $allowedExts))
{
    if ($_FILES["image-upload"]["error"] > 0)
    {
        print_r( "Return Code: " . $_FILES["image-upload"]["error"] . "<br>");
    }
    else
    {
        $image_name = $_POST['emp_id'] ."-". $_FILES["image-upload"]["name"];
        if (file_exists("../upload/" . $image_name))
        {
            print_r( $image_name . " already exists. ");
        }
        else
        {
            $path_image = $conn->query("select path_image from hris_employee where co_id='$site' and emp_id='$_POST[emp_id]'");
            $old_path_image = $path_image->fetch(PDO::FETCH_ASSOC);
            unlink("../upload/" . $old_path_image['PATH_IMAGE']);
            echo "Deleted in: " . "../upload/" . $old_path_image['PATH_IMAGE'];

            copy($_FILES["image-upload"]["tmp_name"],
                "../upload/" . $image_name);
            echo "Stored in: " . "../upload/" . $image_name;
            //update file //
            $sql ="update hris_employee set path_image='$image_name' where co_id='$site' and emp_id='$_POST[emp_id]'";
            $conn->query($sql);
        }
    }
}
else
{
    echo "Invalid file";
}

//print '<pre>';
//print_r($r->getRoleGrid());