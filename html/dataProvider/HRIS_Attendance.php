<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Attendance
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
        $fromdate = $this->db->Date_Converter($params->datetime_in);
        $todate = $this->db->Date_Converter($params->datetime_out);
        $sql = "SELECT * FROM hris_attendance_biofinger('$todate','$fromdate','$params->emp_id','$co_id') $par_search order by attendance_date asc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
       // $total = count($rows);
        //$rows = array_slice($rows, $params->start, $params->limit);
        //return array('totals'=>$total, 'rows'=>$rows);
        return $rows;

    }
    public function select_checkbox(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $sql = "SELECT * FROM hris_attendance_checkbox_s('$user_usrname','$params->mandor_id','$params->afdeling_id','$params->js_id','$params->ol_id','$params->company_id','$co_id') $par_search order by emp_id asc";
        //print_r($sql);
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        // $total = count($rows);
        //$rows = array_slice($rows, $params->start, $params->limit);
        //return array('totals'=>$total, 'rows'=>$rows);
        return $rows;

    }

    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $attendance_date = $this->db->Date_Converter($params->attendance_date); //if($params->status==''){$params->status='0';}
        $time_in = $this->db->Time_Converter($params->time_in); $time_out = $this->db->Time_Converter($params->time_out);
        if($params->status<>'H'){$time_in = Time::getLocalTime('H:i:s'); $time_out = Time::getLocalTime('H:i:s');}
        if($params->status=='' || $params->status== null)
        {
            $sql = "execute procedure hris_attendance_d '$attendance_date','$params->emp_id','$co_id' ";

        } else{
            $sql = "execute procedure hris_attendance_u '$timeedit','$useredit','$params->remarks','$params->status','$time_out','$time_in','$attendance_date','$params->emp_id','$co_id'";
        }
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());