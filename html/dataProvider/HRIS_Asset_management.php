<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Asset_management
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
        $co_id = $_SESSION['user']['site'];
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.management_asset.Asset_management')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $sql = "SELECT * FROM HRIS_ASSET_MANAGEMENT_S('$co_id') where co_id ='$co_id' $view_data $par_search order by timeedit asc";
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
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $user_id = $_SESSION['user']['id'];
        $sql = "SELECT * FROM HRIS_ASSET_MANAGEMENT_S('$user_id','$co_id') $par_search order by seq_id desc";
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

        $co_id = $_SESSION['user']['site'];
        $data = get_object_vars($params);
        if($params->status==''){$data['status']='0';}
        $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['request_date'] = $this->db->Date_Converter($params->request_date);
        unset($data['id'],$data['active'],$data['driver_name'],$data['asset_name'],$data['driver_company_name'],$data['emp_name']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_asset_management', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->status==''){$data['status']='0';}
        $data['request_date'] = $this->db->Date_Converter($params->request_date);
        unset($data['id'],$data['active'],$data['driver_name'],$data['asset_name'],$data['driver_company_name'],$data['emp_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_asset_management', 'U', array('co_id'=>$params->co_id, 'emp_id'=>$params->emp_id, 'seq_id' => $params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_asset_management where co_id='$params->co_id' and emp_id='$params->emp_id' and seq_id = '$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());