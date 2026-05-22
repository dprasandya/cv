<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Award_attendance
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Attendance.Award_attendance')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "select * from(select a.*, a.status as active, b.ol_name, c.unit_name from hris_award_attendance a
        left join hris_office_locations b on a.co_id=b.co_id and a.ol_id=b.ol_id
        left join unit c on a.co_id=c.co_id and a.unit_id=c.unit_id)
        where co_id='$co_id' $view_data $par_search order by sc_name asc";
        
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
        $co_id = $_SESSION['user']['site'];
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        //print_r($params);
        $idArray = $params->no_sc_id;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($array){
            $par_sc_id="and sc_id not in(".implode(',',$array).")";
        }
        //print_r($par_sc_id);
        if($params->ol_id<>''){
            $view_ol_id = "and ol_id ='$params->ol_id'";
        }
        $sql = "select distinct sc_id, sc_name from hris_award_attendance where co_id='$co_id' and status=1 $par_sc_id $par_search order by sc_name asc";
        //print_r($sql);
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
        $data = get_object_vars($params);  $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['emp_name'],$data['ol_name'],$data['unit_name']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_award_attendance', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);  $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        unset($data['id'],$data['active'],$data['emp_name'],$data['ol_name'],$data['unit_name']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_award_attendance', 'U', array('co_id'=>$params->co_id, 'ol_id' => $params->ol_id, 'sc_id' => $params->sc_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_award_attendance_rate where co_id='$params->co_id' and ol_id='$params->ol_id' and sc_id='$params->sc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from hris_award_attendance where co_id='$params->co_id' and ol_id='$params->ol_id' and sc_id='$params->sc_id'");
        $this->db->execLog();
        return $params;
    }

    public function select_detail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = "select * from hris_award_attendance_rate where co_id='$co_id' and ol_id='$params->ol_id' and sc_id='$params->sc_id' order by seq_id asc";
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
    public function add_detail(stdClass $params)
    {
        $data = get_object_vars($params);  $data['co_id']= $_SESSION['user']['site'];
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_award_attendance_rate', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update_detail(stdClass $params)
    {
        $data = get_object_vars($params);  $data['co_id']= $_SESSION['user']['site'];
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_award_attendance_rate', 'U', array('co_id'=>$params->co_id, 'ol_id' => $params->ol_id, 'sc_id' => $params->sc_id,'seq_id' => $params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete_detail(stdClass $params){
        $this->db->setSQL("delete from hris_award_attendance_rate where co_id='$params->co_id' and ol_id='$params->ol_id' and sc_id='$params->sc_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());