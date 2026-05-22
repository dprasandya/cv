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
$file_name = $_FILES["filedata_lt20-inputEl"]["name"];
$file_type = $_FILES["filedata_lt20-inputEl"]["type"];
$file_size = round($_FILES["filedata_lt20-inputEl"]["size"] / 1024, 2) . "  Kilo Bytes";
$slength = 0;
$sdelimiter = ",";
$senclosure = '';
$csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');

ini_set("auto_detect_line_endings", true);
if(!empty($_FILES['filedata_lt20-inputEl']['name']) && in_array($_FILES['filedata_lt20-inputEl']['type'],$csvMimes)) {
    if (is_uploaded_file($_FILES['filedata_lt20-inputEl']['tmp_name'])) {

        //open uploaded csv file with read only mode
        $csvFile = fopen($_FILES['filedata_lt20-inputEl']['tmp_name'], 'r');

        //print_r($csvFile);

        //skip first line
        fgetcsv($csvFile); //, $slength, $sdelimiter, $senclosure

        //parse data from csv file line by line
        while(($line = fgetcsv($csvFile)) !== FALSE){
            //insert member data into database
            $emp_id_x =$conn->query("select emp_id from hris_employee where co_id='$site' and attendance_id='$line[0]'");
            $emp_id = $emp_id_x->fetch(PDO::FETCH_ASSOC);
            if($emp_id[EMP_ID]){
                $time = date('H:i', strtotime($line[1]));
                $date_absen = date('Y-m-d', strtotime($line[1]));
                $prevQuery_x = $conn->query("select count(*) as total from hris_attendance where co_id='$site' and emp_id='$emp_id[EMP_ID]' and attendance_date='$date_absen'");
                $prevQuery = $prevQuery_x->fetch(PDO::FETCH_ASSOC);
                if($prevQuery[TOTAL] > 0) {
                    $sql = "update hris_attendance set time_in = iif('$line[2]'='C/In','$time', time_in), status='H', time_out = iif('$line[2]'='C/Out','$time', time_out) where co_id='$site' and emp_id='$emp_id[EMP_ID]' and attendance_date='$date_absen'";
                }else{
                    $sql = "insert into hris_attendance(co_id, emp_id, attendance_date, time_in, time_out, status) values ('$site','$emp_id[EMP_ID]','$date_absen', iif('$line[2]'='C/In','$time', null),iif('$line[2]'='C/Out','$time', null),'H')";
                }
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