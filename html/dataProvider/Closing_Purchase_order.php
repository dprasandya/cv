<?php

include_once (ROOT . '/classes/dbHelper.php');

class Closing_Purchase_order
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
        $sql = "SELECT first 500 * from closing_po_s('$co_id') $par_search order by doc_date desc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        if($params->status=='true'||$params->status=='1'){
            $params->status='1';
            $sql = "execute procedure closing_po_i '$timeinput','$userinput','$params->status','$params->remarks','$params->warehouse_id','$params->item_type','$params->unit_id','$params->item_id','$doc_date','$params->doc_id','$co_id'";
            $this->db->setSQL($sql);
            $this->db->execOnly();
            return $params;
        }

    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());