<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Overtime_request
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Attendance.Overtime_request')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM hris_overtime_request where co_id='$co_id' $view_data $par_search order by seq_id desc";
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
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $user_id = $_SESSION['user']['id'];
        $this->db->setSQL("select emp_id from hris_employee where co_id='$co_id' and user_id='$user_id'");
        $emp_id = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        $sql = "SELECT * FROM hris_overtime_request where co_id='$co_id' and emp_id='$emp_id[EMP_ID]' $par_search order by seq_id desc";
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
        $data = get_object_vars($params); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname'];
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['overtime_date'] = $this->db->Date_Converter($params->overtime_date);
        unset($data['id'],$data['active']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_overtime_request', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); $data['co_id']= $_SESSION['user']['site'];
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['overtime_date'] = $this->db->Date_Converter($params->overtime_date);
        unset($data['id'],$data['active']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_overtime_request', 'U', array('co_id'=>$params->co_id, 'emp_id'=>$params->emp_id, 'seq_id'=>$params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_overtime_request_detail where co_id='$params->co_id' and emp_id='$params->emp_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
        $this->db->setSQL("delete from hris_overtime_request where co_id='$params->co_id' and emp_id='$params->emp_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());