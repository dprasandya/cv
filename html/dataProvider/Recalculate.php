<?php

include_once (ROOT . '/classes/dbHelper.php');

class Recalculate
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
        $sql = "SELECT * FROM recalculate where co_id='$co_id' $par_search order by seq_id asc";
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
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        if($params->seq_id==1){ // recalculate ar item
           $sql ="execute procedure recalculate_ar_items '$params->period','$co_id' ";
        }else if($params->seq_id==4){ // recalculate synchronize jurnal
            $sql ="execute procedure recalculate_synchronize_jurnal '$params->period','$co_id' ";
        }else if($params->seq_id=5){ // unposting closing month //
            $sql ="update closing_days set status=0 where co_id='$co_id' and period='$params->period' ";
        }
        else if($params->seq_id=6){ // unposting closing year //
            $sql ="update closing_years set status=0 where co_id='$co_id' and period='$params->period'";
        }
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());