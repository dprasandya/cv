<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Overtime
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
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        $co_id = $_SESSION['user']['site'];
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Attendance.Overtime')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        if($params->overtime_type=='manual'){
            $overtime_date = $this->db->Date_Converter($params->overtime_date);
            $sql = "SELECT * FROM hris_overtime_s('$user_usrname','$params->mandor_id','$params->js_id','$params->ol_id','$params->company_id','$overtime_date','$co_id') where co_id='$co_id' $view_data $par_search order by emp_id asc";

        }else if($params->overtime_type=='automatis'){
            $fromdate = $this->db->Date_Converter($params->fromdate);
            $todate = $this->db->Date_Converter($params->todate);
            $sql = "SELECT * FROM hris_overtime_automatic_report('$params->ol_id','$params->js_id','$params->company_id','$todate','$fromdate','$co_id') where co_id='$co_id' $view_data $par_search order by emp_id asc";
            //print_r($sql);
        }
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

    public function add(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $overtime_date = $this->db->Date_Converter($params->overtime_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure hris_overtime_i '$timeinput','$userinput','$params->status','$params->remarks','$params->time_out','$params->time_in','$overtime_date','$params->emp_name','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {

        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $overtime_date = $this->db->Date_Converter($params->overtime_date); if($params->status==''){$params->status='0';}
        $time_in = $this->db->Time_Converter($params->time_in); $time_out = $this->db->Time_Converter($params->time_out);
        if($time_in==''){$time_in = Time::getLocalTime('H:i:s');}  if($time_out==''){$time_out = Time::getLocalTime('H:i:s');}
        $sql = "execute procedure hris_overtime_i '$timeedit','$useredit','$params->status','$params->remarks','$params->time_hours','$time_out','$time_in','$overtime_date','$params->emp_name','$params->emp_id','$co_id'";

        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $params->overtime_date = $this->db->Date_Converter($params->overtime_date);
        $this->db->setSQL("delete from hris_overtime where co_id='$params->co_id' and emp_id='$params->emp_id' and overtime_date='$params->overtime_date'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());