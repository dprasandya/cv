<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Outstation_alocation
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
        $sql = "SELECT * FROM hris_outstation_alocation_s('$params->seq_id','$params->emp_id','$co_id') where co_id='$co_id' $par_search order by seq_id_detail desc";
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
        $co_id= $_SESSION['user']['site'];
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure hris_outstation_alocation_i '$params->attachment','$params->amount','$params->alocation_name','$params->seq_id','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); $data['co_id']= $_SESSION['user']['site'];
        unset($data['id'],$data['active']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key] = null;
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_outstation_alocation', 'U', array('co_id'=>$params->co_id, 'emp_id'=>$params->emp_id, 'seq_id' =>$params->seq_id, 'seq_id_detail' =>$params->seq_id_detail ));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_outstation_alocation where co_id='$params->co_id' and emp_id='$params->emp_id' and seq_id='$params->seq_id' and seq_id_detail='$params->seq_id_detail'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());