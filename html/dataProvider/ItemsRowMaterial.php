<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class ItemsRowMaterial
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
        if($this->url->getPerm_Key_View($user_id,'App.view.master.ItemsRowMaterialFnB')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $idArray = $params->item_type;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $item_type =" and item_type IN(".implode(',',$array).")";
        };
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from ( select a.*, a.status as active, b.coa_name as coa_name_biaya, c.coa_name as coa_name_tm, d.coa_name as coa_name_tbm FROM items a 
        left join coa b on a.co_id=b.co_id and a.coa_biaya=b.coa_id
        left join coa c on a.co_id=c.co_id and a.coa_tm=c.coa_id
        left join coa d on a.co_id=d.co_id and a.coa_tbm=d.coa_id) 
        where co_id='$co_id' $item_type $view_data $par_search order by timeedit desc";
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
        unset($data['id'],$data['active'],$data['costcode_name'],$data['coa_name_biaya'],$data['coa_name_tm'],$data['coa_name_tbm']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
            }
        }
        $sql = $this->db->sqlBind($data, 'items', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['costcode_name'],$data['coa_name_biaya'],$data['coa_name_tm'],$data['coa_name_tbm']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //$data[$key]=null;
            }
        }
        $sql = $this->db->sqlBind($data, 'items', 'U', array('co_id'=>$params->co_id,'item_id' => $params->item_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from items where co_id='$params->co_id' and item_id = '$params->item_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());