<?php

$db = new mysqli('localhost', 'root', 'Saraswanti*818', 'dbspi');

if ($db->connect_error) {
    die("Unable to connect database: " . $db->connect_error);
}

$file_name = $_FILES["file"]["name"];
$file_type = $_FILES["file"]["type"];
$file_size = round($_FILES["file"]["size"] / 1024, 2) . "  Kilo Bytes";
$slength = 0;
$sdelimiter = ",";
$senclosure = '"';
$csvMimes = array('text/x-comma-separated-values', 'text/comma-separated-values', 'application/octet-stream', 'application/vnd.ms-excel', 'application/x-csv', 'text/x-csv', 'text/csv', 'application/csv', 'application/excel', 'application/vnd.msexcel', 'text/plain');

ini_set("auto_detect_line_endings", true);

if(!empty($_FILES['file']['name']) && in_array($_FILES['file']['type'],$csvMimes)) {
    if (is_uploaded_file($_FILES['file']['tmp_name'])) {

        //open uploaded csv file with read only mode
        $csvFile = fopen($_FILES['file']['tmp_name'], 'r');

        //skip first line
        fgetcsv($csvFile, $slength, $sdelimiter, $senclosure);

        //parse data from csv file line by line
        while(($line = fgetcsv($csvFile, $slength, $sdelimiter, $senclosure)) !== FALSE){
            //insert member data into database
            $sql = "INSERT INTO citizens (first_name, last_name, company_name, address, city, county, state, zip, phone1, phone2, email, web) VALUES ('".$line[0]."','".$line[1]."','".$line[2]."','".$line[3]."','".$line[4]."','".$line[5]."','".$line[6]."','".$line[7]."','".$line[8]."','".$line[9]."','".$line[10]."','".$line[11]."')";

            $db->query($sql);

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

?>