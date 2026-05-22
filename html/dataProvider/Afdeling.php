<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Afdeling
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.Afdeling')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        //$sql = "SELECT * FROM afdeling_s('$co_id')
        $sql ="Select * From (select a.*, a.status as active, b.coa_name as coa_name_before, c.coa_name as coa_name_after, d.coa_name as coa_name_reclass, e.coa_name as coa_name_depreciation from afdeling a
        left join coa b on a.co_id=b.co_id and a.coa_id_before=b.coa_id 
        left join coa c on a.co_id=c.co_id and a.coa_id_after=c.coa_id 
        left join coa d on a.co_id=d.co_id and a.coa_reclass=d.coa_id 
        left join coa e on a.co_id=e.co_id and a.coa_depreciation=e.coa_id 
        ) where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $sql = "SELECT * FROM afdeling_s('$co_id') where co_id='$co_id' and status=1 $par_search order by timeedit desc";
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
    public function afdeling_group(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT distinct a.afdeling_group, sum(a.area) as area, b.rate
        from afdeling a
        left join afdeling_premi b on a.co_id=b.co_id and a.afdeling_group=b.afdeling_group and b.sc_id in('UPM23')
        where a.co_id='$co_id' and a.status=1
        group by a.afdeling_group, b.rate";
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
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['reclass_tm'],$data['active'],$data['coa_name_before'],$data['coa_name_after'],$data['coa_name_reclass'],$data['coa_name_depreciation']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'afdeling', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['reclass_tm'],$data['active'],$data['coa_name_before'],$data['coa_name_after'],$data['coa_name_reclass'],$data['coa_name_depreciation']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'afdeling', 'U', array('co_id'=>$params->co_id,'afdeling_id' => $params->afdeling_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from afdeling where co_id='$params->co_id' and afdeling_id = '$params->afdeling_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());