<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Attendance_sharing_id
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Attendance.Attendace_sharing_id')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT a.*, a.status as active FROM hris_attendance_sharing_id_s('$co_id') a where a.co_id='$co_id' $par_search $view_data order by a.timeedit desc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $sql = "execute procedure hris_attendance_u '$timeinput','$userinput','$params->status','$params->company_id_05','$params->company_id_04','$params->company_id_03','$params->company_id_02','$params->company_id_01','$params->emp_id_05','$params->emp_id_04','$params->emp_id_03','$params->emp_id_02','$params->emp_id_01','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $sql = "execute procedure hris_attendance_u '$timeedit','$useredit','$params->status','$params->company_id_05','$params->company_id_04','$params->company_id_03','$params->company_id_02','$params->company_id_01','$params->emp_id_05','$params->emp_id_04','$params->emp_id_03','$params->emp_id_02','$params->emp_id_01','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_attendance_sharing_id where co_id='$params->co_id' and seq_id = '$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());