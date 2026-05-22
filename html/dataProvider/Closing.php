<?php

include_once (ROOT . '/classes/dbHelper.php');

class Closing
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
        return;
    }

    public function select_month(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM closing_days where co_id='$co_id' $par_search order by timeedit desc";
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
    public function add_month(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['closing_date']= $this->db->Date_Converter($params->closing_date);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'closing_days', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update_month(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['closing_date']= $this->db->Date_Converter($params->closing_date);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'closing_days', 'U', array('co_id'=>$params->co_id,'period' => $params->period));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete_month(stdClass $params){
        $this->db->setSQL("delete from closing_days where co_id='$params->co_id' and period = '$params->period'");
        $this->db->execLog();
        return $params;
    }
    public function select_year(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM closing_years where co_id='$co_id' $par_search order by timeedit desc";
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
    public function add_year(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['closing_date']= $this->db->Date_Converter($params->closing_date);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'closing_years', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update_year(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['closing_date']= $this->db->Date_Converter($params->closing_date);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'closing_years', 'U', array('co_id'=>$params->co_id,'period' => $params->period));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete_year(stdClass $params){
        $this->db->setSQL("delete from closing_years where co_id='$params->co_id' and period = '$params->period'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());