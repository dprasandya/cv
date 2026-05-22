<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Mandor
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.Mandor')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 a.*, a.status as active FROM mandor_s('$co_id') a where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $sql = "SELECT first 500 * FROM mandor_s('$co_id') where status=1 $par_search order by mandor_id asc";
        //print_r($sql);
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->active==''){$params->status='0';}else{$params->status='1';}
        $sql = "execute procedure mandor_i '$timeinput','$userinput','$params->status','$params->remarks','$params->afdeling_group','$params->ol_id','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->active==''){$params->status='0';}else{$params->status='1';}
        $sql = "execute procedure mandor_u '$timeedit','$useredit','$params->status','$params->remarks','$params->afdeling_group','$params->ol_id','$params->emp_id','$params->mandor_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from mandor_detail where co_id='$params->co_id' and mandor_id = '$params->mandor_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from mandor where co_id='$params->co_id' and mandor_id = '$params->mandor_id'");
        $this->db->execLog();
        return $params;
    }
    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM mandor_detail_s('$params->mandor_id','$co_id') where co_id='$co_id' $par_search order by emp_id asc";
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
    public function adddetail(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],$data['emp_name']); $data['co_id']= $_SESSION['user']['site']; 
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'mandor_detail', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $data = get_object_vars($params); 
        unset($data['id'],$data['emp_name']); $data['co_id']= $_SESSION['user']['site']; 
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'mandor_detail', 'U', array('co_id'=>$params->co_id,'mandor_id' => $params->mandor_id,'emp_id' => $params->emp_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $this->db->setSQL("delete from mandor_detail where co_id='$params->co_id' and mandor_id = '$params->mandor_id' and emp_id = '$params->emp_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());