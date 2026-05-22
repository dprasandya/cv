<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Work_order_detail
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
        $sql = "SELECT * from work_order_detail where co_id='$co_id' and doc_id='$params->doc_id' $par_search order by seq_id desc";
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
        $payment_date = $this->db->Date_Converter($params->payment_date); $claim_date = $this->db->Date_Converter($params->claim_date);
        $sql = "execute procedure work_order_detail_i '$params->claim_value','$claim_date','$payment_date','$params->progress_prs','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $payment_date = $this->db->Date_Converter($params->payment_date); $claim_date = $this->db->Date_Converter($params->claim_date);
        $sql = "execute procedure work_order_detail_u '$params->claim_value','$claim_date','$payment_date','$params->progress_prs','$params->seq_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function delete(stdClass $params){
        $sql = ("delete from work_order_detail where co_id='$params->co_id' and doc_id = '$params->doc_id' and seq_id='$params->seq_id'");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());