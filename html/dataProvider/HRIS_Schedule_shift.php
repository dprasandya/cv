<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Schedule_shift
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
        (object)$this->url = new Roles();
        return;
    }

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $sql = "SELECT * FROM hris_schedule_shift_s('$user_usrname','$params->pos_id','$params->dept_id','$params->ol_id','$params->company_id','$co_id') $par_search";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function add(stdClass $params)
    {

        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $from_date = $this->db->Date_Converter($params->fromdate); $to_date = $this->db->Date_Converter($params->todate);
        //if($params->time_in<>''){$time_in =  $this->db->Time_Converter($params->time_in);}else{$time_in=Time::getLocalTime('H:i:s');}
       // if($params->time_out<>''){$time_out = $this->db->Time_Converter($params->time_out);}else{$time_out=Time::getLocalTime('H:i:s');}
        if($params->seq_id=='') {$params->seq_id=9999;}
        $sql = "execute procedure hris_schedule_shift_i '$timeedit','$useredit','$params->oh_id','$params->day_type',$params->seq_id,'$to_date','$from_date','$params->emp_id','$co_id'";

        $this->db->setSQL($sql);
       $this->db->execLog();
        return $params;
    }

    public function select_schedule(stdClass $params)
    {
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Attendance.Schedule_shift')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $from_date = $this->db->Date_Converter($params->fromdate); $to_date = $this->db->Date_Converter($params->todate);
        $sql = "SELECT * FROM hris_schedule_shift_view('$from_date','$to_date','$params->emp_id','$user_usrname','$co_id') where co_id='$co_id' $view_data";

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

    public function update_schedule(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $schedule_date = $this->db->Date_Converter($params->schedule_date);
        $time_in = $this->db->Time_Converter($params->time_in); $time_out = $this->db->Time_Converter($params->time_out);
        $sql = "update hris_schedule_shift set day_type='$params->day_type', time_in=iif('$params->day_type'='Off Day', null, '$time_in'), time_out=iif('$params->day_type'='Off Day',null,'$time_out'), useredit='$useredit', timeedit='$timeedit' where co_id='$co_id' and emp_id='$params->emp_id' and schedule_date='$schedule_date'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());