<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Bpjs
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Pph21.Bpjs')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (select a.*, a.status as active, b.sc_name as sc_name_company, c.sc_name as sc_name_employee from hris_bpjs a
left join hris_salary_component b on a.co_id=b.co_id and a.sc_id_company=b.sc_id
left join hris_salary_component c on a.co_id=c.co_id and a.sc_id_employee=c.sc_id) where co_id='$co_id' $par_search $view_data order by timeedit desc";
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
        $sql = "SELECT * FROM (select a.*, a.status as active, b.sc_name as sc_name_company, c.sc_name as sc_name_employee from hris_bpjs a
left join hris_salary_component b on a.co_id=b.co_id and a.sc_id_company=b.sc_id
left join hris_salary_component c on a.co_id=c.co_id and a.sc_id_employee=c.sc_id) where co_id='$co_id' and bpjs_type='$params->bpjs_type' $par_search order by timeedit desc";
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
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        unset($data['id'],$data['active'],$data['sc_name_company'],$data['sc_name_employee']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_bpjs', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        unset($data['id'],$data['active'],$data['sc_name_company'],$data['sc_name_employee']);
        $sql = $this->db->sqlBind($data, 'hris_bpjs', 'U', array('co_id'=>$params->co_id,'bpjs_id' => $params->bpjs_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_bpjs where co_id='$params->co_id' and bpjs_id = '$params->bpjs_id'");
        $this->db->execLog();
        return $params;
    }
    public function select_rate(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT a.*, a.status as active FROM hris_bpjs_rate_s('I','$params->bpjs_id','$params->emp_id','$co_id') a order by a.sc_id asc";
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
    public function update_rate(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['sc_name'],$data['nominal']); $data['co_id']= $_SESSION['user']['site'];
        if($data['status']=='0'){
            $sql = "delete from hris_bpjs_rate where co_id='$params->co_id' and emp_id='$params->emp_id' and bpjs_id = '$params->bpjs_id' and sc_id = '$params->sc_id' ";
        }else if($data['status']=='1'){
            $this->db->setSQL("SELECT count(*) total FROM hris_bpjs_rate WHERE co_id='$params->co_id'and emp_id='$params->emp_id' and bpjs_id = '$params->bpjs_id' and sc_id = '$params->sc_id'");
            $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
            if($row['TOTAL'] == 0){
                $sql = $this->db->sqlBind($data, 'hris_bpjs_rate', 'I');
            }else{
                $sql = $this->db->sqlBind($data, 'hris_bpjs_rate', 'U', array('co_id'=>$params->co_id,'bpjs_id' => $params->bpjs_id,'emp_id' => $params->emp_id,'sc_id' => $params->sc_id));
            }
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());