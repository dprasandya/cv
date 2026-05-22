<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Overtime_rate
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

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT hris_overtime_rate.*, status as active FROM hris_overtime_rate where co_id='$co_id' $par_search order by seq_id asc";
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
        $data = get_object_vars($params); $data['co_id']= $_SESSION['user']['site'];
        if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        unset($data['id'],$data['active']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_overtime_rate', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); $data['co_id']= $_SESSION['user']['site'];
        if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        unset($data['id'],$data['active']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_overtime_rate', 'U', array('co_id'=>$params->co_id, 'seq_id'=>$params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $params->overtime_date = $this->db->Date_Converter($params->overtime_date);
        $this->db->setSQL("delete from hris_overtime_rate where co_id='$params->co_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());