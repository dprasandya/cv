<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AccountHpp
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
        if($params->station_type<>''){
            $station_type =" and station_type='$params->station_type'";
        };
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT DISTINCT coa.station_name,coa.station_type, status as active FROM coa where co_id='$co_id' and station_name is not null $station_type $par_search order by coa_id asc";
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
    public function selectdetail(stdClass $params)
    {
        
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT coa.*, status as active FROM coa where co_id='$co_id' and station_name='$params->station_name' order by coa_id asc";
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
        $idArray = $params->coa_type;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $coa_type =" and coa_type IN(".implode(',',$array).")";
        };

        $idArray2 = $params->station_type;
        $array2 = [];
        for($i = 0 ; $i < count($idArray2) ; $i++){
            array_push($array2, "'".$idArray2[$i]."'");
        }
        if($idArray2<>''){
            $station_type =" and station_type IN(".implode(',',$array2).")";
        };

        $idArray3 = $params->station_group;
        $array3 = [];
        for($i = 0 ; $i < count($idArray3) ; $i++){
            array_push($array3, "'".$idArray3[$i]."'");
        }
        if($idArray3<>''){
            $station_group =" and station_group IN(".implode(',',$array3).")";
        };

        $sql = "SELECT * FROM coa where co_id='$co_id' and status=1 and level=5 $coa_type $station_type $station_group $par_search order by coa_id asc";
       // print_r($sql);
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
    /*public function add(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'coa', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'coa', 'U', array('co_id'=>$params->co_id,'coa_id' => $params->coa_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from coa where co_id='$params->co_id' and coa_id = '$params->coa_id'");
        $this->db->execLog();
        return $params;
    }
    */

}


//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());