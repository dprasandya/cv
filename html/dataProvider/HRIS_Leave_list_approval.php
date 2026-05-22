<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Leave_list_approval
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
        $co_id = $_SESSION['user']['site'];
        $leave_date = $this->db->Date_Converter($params->leave_date);
        $sql = "SELECT * FROM hris_leave_list_approval_s ('$leave_date', '$params->ol_id','$params->lt_id', '$params->seq_id', '$params->user_id','$params->emp_id','$co_id') $par_search";
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