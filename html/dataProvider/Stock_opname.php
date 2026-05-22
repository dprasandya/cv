<?php

include_once (ROOT . '/classes/dbHelper.php');

class Stock_opname
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
        //$doc_date = $this->db->Date_Converter($params->doc_date);
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * from stock_opname_s('$params->item_type','$params->period','$co_id') $par_search order by item_name asc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure stock_opname_i '$timeinput','$userinput','$params->status','$params->remarks','$params->station_id','$params->qty_opname_conversion','$params->item_type','$params->unit_id_conversion','$params->item_id','$params->warehouse_id','$doc_date','$co_id'";
        print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        if($params->status=='true'||$params->status=='1'){
            $params->status='1';
            $sql = "execute procedure stock_opname_i '$timeinput','$userinput','$params->status','$params->remarks','$params->station_id','$params->qty_opname_conversion','$params->item_type','$params->unit_id_conversion','$params->item_id','$params->warehouse_id','$doc_date','$co_id'";
            $this->db->setSQL($sql);
            $this->db->execOnly();
            return $params;
        }

    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from stock_opname where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());