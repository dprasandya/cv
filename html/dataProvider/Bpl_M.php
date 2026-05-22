<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Bpl_M
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.Bpl_M')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, b.coa_name as coa_name_debit, c.coa_name as coa_name_credit, a.status as active from bpl_m a 
        left join coa b on a.co_id=b.co_id and a.coa_id_debit=b.coa_id
        left join coa c on a.co_id=c.co_id and a.coa_id_credit=c.coa_id)
        where co_id='$co_id' $view_data $par_search order by bpl_id asc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

        /*$total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);*/
    }
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM bpl_m where co_id='$co_id' and status=1 $par_search order by bpl_id asc";
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
        unset($data['id'],$data['active'],$data['coa_name_debit'],$data['coa_name_credit']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'bpl_m', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['coa_name_debit'],$data['coa_name_credit']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'bpl_m', 'U', array('co_id'=>$params->co_id,'bpl_id' => $params->bpl_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from bpl_m where co_id='$params->co_id' and bpl_id = '$params->bpl_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());