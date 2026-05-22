<?php

include_once (ROOT . '/classes/dbHelper.php');

class Unposting_transactions
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
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM unposting_transactions_s('$params->status','$params->period','$params->module','$co_id') $par_search";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
        /*$rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);*/
    }
    public function add(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'] ; if($params->nominal==''){$params->nominal=0;} if($params->qty==''){$params->qty=0;}
        $sql ="execute procedure unposting_transactions_i '$params->status', '$params->module','$params->tax_id','$params->cash_id',$params->nominal,$params->qty,'$params->item_id','$params->supplier_customer','$params->doc_id','$co_id' ";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());