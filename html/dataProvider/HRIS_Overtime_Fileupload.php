<?php

require_once ('../classes/pdo_database.class.php');
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
$file_name = $_FILES["filedata_overtime-inputEl"]["name"];
$file_type = $_FILES["filedata_overtime-inputEl"]["type"];
$file_size = round($_FILES["filedata_overtime-inputEl"]["size"] / 1024, 2) . "  Kilo Bytes";
$slength = 0;
$sdelimiter = ",";
$senclosure = '';
$csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');

ini_set("auto_detect_line_endings", true);
if(!empty($_FILES['filedata_overtime-inputEl']['name']) && in_array($_FILES['filedata_overtime-inputEl']['type'],$csvMimes)) {
    if (is_uploaded_file($_FILES['filedata_overtime-inputEl']['tmp_name'])) {

        //open uploaded csv file with read only mode
        $csvFile = fopen($_FILES['filedata_overtime-inputEl']['tmp_name'], 'r');

        //print_r($csvFile);

        //skip first line
        fgetcsv($csvFile); //, $slength, $sdelimiter, $senclosure
        $attendace_date = fgetcsv($csvFile);
        $date_01 = $attendace_date[4]; $date_02 = $attendace_date[5]; $date_03 = $attendace_date[6]; $date_04 = $attendace_date[7]; $date_05 = $attendace_date[8];
        $date_06 = $attendace_date[9]; $date_07 = $attendace_date[10]; $date_08 = $attendace_date[11]; $date_09 = $attendace_date[12]; $date_10 = $attendace_date[13];
        $date_11 = $attendace_date[14]; $date_12 = $attendace_date[15]; $date_13 = $attendace_date[16]; $date_14 = $attendace_date[17]; $date_15 = $attendace_date[18];
        $date_16 = $attendace_date[19]; $date_17 = $attendace_date[20]; $date_18 = $attendace_date[21]; $date_19 = $attendace_date[22]; $date_20 = $attendace_date[23];
        $date_21 = $attendace_date[24]; $date_22 = $attendace_date[25]; $date_23 = $attendace_date[26]; $date_24 = $attendace_date[27]; $date_25 = $attendace_date[28];
        $date_26 = $attendace_date[29]; $date_27 = $attendace_date[30]; $date_28 = $attendace_date[31]; $date_29 = $attendace_date[32]; $date_30 = $attendace_date[33];
        $date_31 = $attendace_date[34];
        $array_date = array($date_01,$date_02,$date_03,$date_04,$date_05,$date_06,$date_07,$date_08,$date_09,$date_10,$date_11,$date_12,$date_13,$date_14,$date_15,$date_16,$date_17,$date_18,$date_19,$date_20,$date_21,$date_22,$date_23,$date_24,$date_25,$date_26,$date_27,$date_28,$date_29,$date_30,$date_31);
        ///parse data from csv file line by line
        while(($line = fgetcsv($csvFile)) !== FALSE){
            //$line[36] = Date_Converter($line[36]);
            //insert member data into database
            if($line[2]){ // emp_id //
                for ($x=0; $x<=count($array_date)-1; $x++)
                {
                    $times = 4 + $x;
                    if($array_date[$x]){
                        if($line[$times]){
                            $prevQuery_x = $conn->query("select count(*) as total from hris_overtime where co_id='$site' and emp_id='$line[2]' and overtime_date='$array_date[$x]'");
                            $prevQuery = $prevQuery_x->fetch(PDO::FETCH_ASSOC);
                            if($prevQuery[TOTAL] > 0) { // sudah pernah ada data //
                                $sql = "update hris_overtime set time_hours='$line[$times]' where co_id='$site' and emp_id='$line[2]' and overtime_date='$array_date[$x]'";
                            }else{
                                $sql = "insert into hris_overtime(co_id, emp_id, overtime_date, time_hours, status) values ('$site','$line[2]','$array_date[$x]','$line[$times]',1)";
                            }
                            $conn->query($sql);
                        }else{
                            $sql = "delete from hris_overtime where co_id='$site' and emp_id='$line[2]' and overtime_date='$array_date[$x]' ";
                            $conn->query($sql);
                        }
                    }
                }
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
    {   //dd/mm/yy
        $month = Month_Converter(substr($date,3,3));
        $date = "20" . substr($date,7,4) . "-" . $month . "-" . substr($date,0,2);
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