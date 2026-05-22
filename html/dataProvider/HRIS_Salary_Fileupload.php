<?php

require_once ('../classes/pdo_database.class.php');
include_once ('../classes/Time.php');

if(!defined('site_db_type')) define('site_db_type', 'firebird');
if(!defined('site_db_host')) define('site_db_host', 'localhost');
if(!defined('site_db_port')) define('site_db_port', '3050');
if(!defined('site_db_username')) define('site_db_username', 'sysdba');
if(!defined('site_db_password')) define('site_db_password', 'masterkey');
if(!defined('site_db_database')) define('site_db_database', '/var/sites/pph21/database/spi.fdb');
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
if(!defined('site_name')) define('site_name', 'SPI');
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
$file_name = $_FILES["filedata_salary-inputEl"]["name"];
$file_type = $_FILES["filedata_salary-inputEl"]["type"];
$file_size = round($_FILES["filedata_salary-inputEl"]["size"] / 1024, 2) . "  Kilo Bytes";
$slength = 0;
$sdelimiter = ",";
$senclosure = '';
$csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');

ini_set("auto_detect_line_endings", true);
if(!empty($_FILES['filedata_salary-inputEl']['name']) && in_array($_FILES['filedata_salary-inputEl']['type'],$csvMimes)) {
    if (is_uploaded_file($_FILES['filedata_salary-inputEl']['tmp_name'])) {

        //open uploaded csv file with read only mode
        $csvFile = fopen($_FILES['filedata_salary-inputEl']['tmp_name'], 'r');

        //print_r($csvFile);

        //skip first line
        fgetcsv($csvFile); //, $slength, $sdelimiter, $senclosure
        fgetcsv($csvFile);
        $pay_frequency = fgetcsv($csvFile); $pay_freq_gp = $pay_frequency[2]; $pay_freq_jabatan = $pay_frequency[3]; $pay_freq_kesejahteraan = $pay_frequency[4];
        $pay_freq_khusus = $pay_frequency[5]; $pay_freq_ops = $pay_frequency[6]; $pay_freq_um = $pay_frequency[8];  $pay_freq_tr = $pay_frequency[9]; $pay_freq_tht = $pay_frequency[10];
        //parse data from csv file line by line
        while(($line = fgetcsv($csvFile)) !== FALSE){
            $co_id= $site;
            $line[10] = $line[10]=='' ? 0 : $line[10];
            $line[9] = $line[9]=='' ? 0 : $line[9];
            $line[8] = $line[8]=='' ? 0 : $line[8];
            $line[6] = $line[6]=='' ? 0 : $line[6];
            $line[5] = $line[5]=='' ? 0 : $line[5];
            $line[4] = $line[4]=='' ? 0 : $line[4];
            $line[3] = $line[3]=='' ? 0 : $line[3];
            $line[2] = $line[2]=='' ? 0 : $line[2];
            $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
            //insert member data into database
            if($line[0]){ // kolom penomoran //
                $sql = "execute procedure hris_employee_salary_upload('$timeinput','$userinput','$pay_freq_tht',$line[10],'$pay_freq_tr',$line[9],'$pay_freq_um',$line[8],'$pay_freq_ops',$line[6],'$pay_freq_khusus',$line[5],'$pay_freq_kesejahteraan',$line[4],'$pay_freq_jabatan',$line[3],'$pay_freq_gp',$line[2],'$line[0]','$co_id')";
                //print_r($sql);
                $conn->query($sql);
            }
        }

        //close opened csv file
        fclose($csvFile);

        $response = array('success' => true,
            'data' => array('name' => $_FILES['file']['name'], 'size' => $file_size),
            'msg' => 'Upload successfully'
        );
        echo json_encode($response);
    }
    else {
        $error  = $_FILES["file"]["error"];
        $response = array('success' => false, 'msg' => $error);
        echo json_encode($response);
    }
}
else
    if ($_FILES["file"]["error"] > 0)
    {
        $error  = $_FILES["file"]["error"];
        $response = array('success' => false, 'msg' => $error);
        echo json_encode($response);
    }


function Date_Converter($date) {
# Exception
    if (!is_null($date))
    {
        $date = new DateTime($date, new DateTimeZone("Asia/Jakarta"));
        $strdate = $date->format('Y-m-d');
        # Separate Date from Time
        $strdate = explode(" ", $strdate);
        $date = $strdate[0];
    }
    return $date;
}
function Month_Converter($month){
    if($month=='Feb'){
        return '02';
    }else if($month=='Mar'){return '03';}
    else if($month=='Apr'){return '04';}
    else if($month=='Mei'){return '05';}
    else if($month=='Jun'){return '06';}
    else if($month=='Jul'){return '07';}
    else if($month=='Agu'){return '08';}
    else if($month=='Sep'){return '09';}
    else if($month=='Okt'){return '10';}
    else if($month=='Nov'){return '11';}
    else if($month=='Des'){return '12';}
}
//print '<pre>';
//print_r($r->getRoleGrid());