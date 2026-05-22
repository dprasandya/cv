<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class UnitBuilding
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.UnitBuilding')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, a.status as active, b.cluster_name, c.building_name, d.floor_name, e.project_name, e.net_effective, f.block_name, g.rt_name from unit_building a
        left join cluster b on a.co_id=b.co_id and a.cluster_id=b.cluster_id
        left join building_type c on a.co_id=c.co_id and a.building_id=c.building_id
        left join floor d on a.co_id=d.co_id and a.floor_id=d.floor_id
        left join project e on a.co_id=e.co_id and a.project_id=e.project_id
        left join blok f on a.co_id=f.co_id and a.block_id=f.block_id
        left join room_type g on a.co_id=g.co_id and a.rt_id=g.rt_id
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
        $idArray = $params->unit_building_status;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $unit_building_status =" and unit_building_status IN(".implode(',',$array).")";
        };
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, b.cluster_name, c.building_name, d.floor_name, e.project_name from unit_building a
        left join cluster b on a.co_id=b.co_id and a.cluster_id=b.cluster_id
        left join building_type c on a.co_id=c.co_id and a.building_id=c.building_id
        left join floor d on a.co_id=d.co_id and a.floor_id=d.floor_id
        left join project e on a.co_id=e.co_id and a.project_id=e.project_id)
        where co_id='$co_id' and status=1 $unit_building_status $par_search order by timeedit desc";
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
    public function popup_customer(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $idArray = $params->order_status;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $order_status =" where order_status IN(".implode(',',$array).")";
        };
        $co_id = $_SESSION['user']['site'];
        $sql = "select * from (select a.*, b.identity_no as cust_id, coalesce(b.first_name,'')||' '||coalesce(b.last_name,'') as cust_name, c.cluster_name, d.building_name, e.floor_name, f.project_name, g.unit_building_name from(
    select a.co_id, a.project_id, null as for_doc_id, a.unit_building_id, a.cluster_id, a.facing_id, a.floor_id, a.building_id, a.area_m2, a.registration_id, 'SALES' as order_status
    from registration_unit a
    left join ap_invoice b on a.co_id=b.co_id and a.project_id=b.project_id and a.unit_building_id=b.unit_building_id and a.registration_id=b.registration_id
    where a.status=1 and b.doc_id is null
    union all
    select co_id, project_id, null as for_doc_id, unit_building_id, cluster_id, facing_id, floor_id, building_id, area_m2, registration_id, 'RENT' as order_status
    from registration_unit_rent where status=1
    union all 
    select a.co_id, a.project_id, null as for_doc_id, a.unit_building_id, a.cluster_id, a.facing_id, a.floor_id, a.building_id, a.area_m2, a.registration_id, 'BUYBACK' as order_status
    from registration_unit a
    inner join(
        select co_id, registration_id, registration_unit_id, unit_building_id, sum(receivable) as receivable  from ar_sale where status=1 and outstanding_receivable <=0  group by co_id, registration_id, registration_unit_id, unit_building_id
    )b on a.co_id=b.co_id and a.registration_id=b.registration_id and a.seq_id=b.registration_unit_id and a.unit_building_id=b.unit_building_id
    left join ap_invoice c on a.co_id=c.co_id and c.status<>2 and a.registration_id=c.registration_id and a.unit_building_id=c.unit_building_id and c.doc_type='U'
    where a.status=1 and a.outstanding_month=0 and cast(a.total-coalesce(b.receivable,0) as numeric(18,0))=0 and c.doc_id is null
    union all
    select co_id, project_id, doc_id as for_doc_id, unit_building_id, cluster_id, facing_id, floor_id, building_id, area_m2, registration_id, 'CHECK IN' as order_status
    from registration_unit_ci where status=1 and rs_id='OC'
    ) a
left join registration b on a.co_id=b.co_id and a.registration_id=b.registration_id
left join cluster c on a.co_id=c.co_id and a.cluster_id=c.cluster_id
left join building_type d on a.co_id=d.co_id and a.building_id=d.building_id
left join floor e on a.co_id=e.co_id and a.floor_id=e.floor_id
left join project f on a.co_id=f.co_id and a.project_id=f.project_id
left join unit_building g on a.co_id=g.co_id and a.unit_building_id=g.unit_building_id) $order_status $par_search";
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
    public function popup_rent(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $idArray = $params->rent_status;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $rent_status =" and rent_status IN(".implode(',',$array).")";
        };
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, b.cluster_name, c.building_name, d.floor_name, e.project_name from unit_building a
        left join cluster b on a.co_id=b.co_id and a.cluster_id=b.cluster_id
        left join building_type c on a.co_id=c.co_id and a.building_id=c.building_id
        left join floor d on a.co_id=d.co_id and a.floor_id=d.floor_id
        left join project e on a.co_id=e.co_id and a.project_id=e.project_id)
        where co_id='$co_id' and status=1 $rent_status $par_search order by timeedit desc";
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
    public function popup_ci(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, b.cluster_name, c.building_name, d.floor_name, e.project_name, f.rt_name from unit_building a
        left join cluster b on a.co_id=b.co_id and a.cluster_id=b.cluster_id
        left join building_type c on a.co_id=c.co_id and a.building_id=c.building_id
        left join floor d on a.co_id=d.co_id and a.floor_id=d.floor_id
        left join project e on a.co_id=e.co_id and a.project_id=e.project_id
        left join room_type f on a.co_id=f.co_id and a.rt_id=f.rt_id)
        where co_id='$co_id' and status=1 and rent_status<>'OO' $par_search order by timeedit desc";
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
        unset($data['id'],$data['active'],$data['floor_name'],$data['cluster_name'],$data['building_name'],$data['project_name'],$data['facing_name'],$data['block_name'],$data['net_effective'],$data['rt_name']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'unit_building', 'I');
        
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['floor_name'],$data['cluster_name'],$data['building_name'],$data['project_name'],$data['facing_name'],$data['block_name'],$data['net_effective'],$data['rt_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'unit_building', 'U', array('co_id'=>$params->co_id,'unit_building_id' => $params->unit_building_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from unit_building where co_id='$params->co_id' and unit_building_id = '$params->unit_building_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());