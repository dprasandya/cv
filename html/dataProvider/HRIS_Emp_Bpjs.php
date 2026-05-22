<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Emp_Bpjs
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
        $sql = "SELECT * FROM (select a.*, b.sc_name from hris_emp_bpjs a
left join hris_salary_component b on a.co_id=b.co_id and a.sc_id=b.sc_id) where co_id='$co_id' and emp_id='$params->emp_id' $par_search order by sc_type, sc_id asc";
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
        $data = get_object_vars($params);
        unset($data['id'],$data['active'],$data['sc_name']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['name']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_emp_bpjs', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],$data['active'],$data['sc_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_emp_bpjs', 'U', array('co_id'=>$params->co_id,'emp_id' => $params->emp_id, 'sc_id' => $params->sc_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_emp_bpjs where co_id='$params->co_id' and emp_id = '$params->emp_id' and sc_id ='$params->sc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());