<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Customer
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.Customer')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from (select a.*, a.status as active, b.coa_name, c.coa_name as coa_sale_name, d.coa_name as coa_advance_name FROM customer a 
        left join coa b on a.co_id=b.co_id and a.coa_id=b.coa_id
        left join coa c on a.co_id=c.co_id and a.coa_sale=c.coa_id
        left join coa d on a.co_id=d.co_id and a.coa_advance=d.coa_id) 
        where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $idArray = $params->cust_type;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        $sql = "SELECT * FROM customer where co_id='$co_id' and status=1 and cust_type  IN(".implode(',',$array).") $par_search order by timeedit desc";
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
    public function LivePopup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $idArray = $params->cust_type;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        $sql = "SELECT * FROM customer where co_id='$co_id' and status=1 and cust_type='P' and (upper(cust_name) like upper('%".$params->query."%') or upper(cust_id) like upper('%".$params->query."%')) $par_search order by timeedit desc";
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
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['coa_name'],$data['coa_sale_name'],$data['coa_advance_name']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'customer', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['coa_name'],$data['coa_sale_name'],$data['coa_advance_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'customer', 'U', array('co_id'=>$params->co_id,'cust_id' => $params->cust_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from customer_ext_address where co_id='$params->co_id' and cust_id = '$params->cust_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from customer where co_id='$params->co_id' and cust_id = '$params->cust_id'");
        $this->db->execLog();
        return $params;
    }
    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT a.*, a.status as active FROM customer_ext_address a where a.co_id='$co_id' and a.cust_id='$params->cust_id' $par_search order by a.seq_id desc";
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
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site'];
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'customer_ext_address', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site'];
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'customer_ext_address', 'U', array('co_id'=>$params->co_id,'cust_id' => $params->cust_id, 'seq_id' => $params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $this->db->setSQL("delete from customer_ext_address where co_id='$params->co_id' and cust_id = '$params->cust_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());