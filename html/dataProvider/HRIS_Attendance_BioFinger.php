<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Attendance_BioFinger
{
    /**
     * @var dbHelper
     */
    private $db;

    function __construct()
    {
        // Declare all the variables that we are gone to use
        // within the class.
        (object)$this->db = new dbHelper();
        return;
    }

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $params->fromdate = $this->db->Date_Converter($params->fromdate);
        $params->todate = $this->db->Date_Converter($params->todate);
        $sql = "SELECT first 500 * FROM hris_attendance_biofinger_s('$params->todate','$params->fromdate','$user_usrname', '$co_id')
$par_search order by timeinput desc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);

    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());