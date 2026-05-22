<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Pph21_simulation_employee_salary
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
        $sql = "SELECT * FROM hris_pph21_sim_emp_salary where co_id='$co_id' and emp_id='$params->emp_id' and sc_type='$params->sc_type' $par_search order by timeedit asc";
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
        $idArray = $params->coa_type;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $coa_type =" and coa_type IN(".implode(',',$array).")";
        };
        $sql = "SELECT * FROM coa where co_id='$co_id' and status=1 and level=5 $coa_type  $par_search order by coa_id asc";
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
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['name']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_pph21_sim_emp_salary', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;

        $sql = $this->db->sqlBind($data, 'hris_pph21_sim_emp_salary', 'U', array('co_id'=>$params->co_id,'emp_id' => $params->emp_id, 'sc_type' => $params->sc_type, 'sc_id' => $params->sc_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $sql = "delete from hris_pph21_sim_emp_salary where co_id='$co_id' and emp_id = '$params->emp_id' and sc_type = '$params->sc_type' and sc_id='$params->sc_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());