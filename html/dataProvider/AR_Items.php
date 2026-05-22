<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AR_Items
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
        (object)$this->url = new Roles();
        return;
    }


    public function selectdetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $doc_date = $this->db->Date_Converter($params->doc_date); 
        $sql = "SELECT * from ar_items_detail_s('$params->warehouse_id','$doc_date','$params->doc_id','$co_id')";
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
    public function adddetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql = "execute procedure ar_items_detail_i '$params->price_sale','$params->qty','$params->item_type','$params->unit_id','$params->item_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        //$sql = "execute procedure ar_items_detail_u '$params->price_sale','$params->qty','$params->unit_id','$params->item_id','$params->seq_id','$params->doc_id','$co_id'";
        $sql = "execute procedure ar_items_detail_i '$params->price_sale','$params->qty','$params->item_type','$params->unit_id','$params->item_id','$params->for_doc_id','$params->doc_id','$co_id'";
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("execute procedure ar_items_detail_d('$params->seq_id','$params->doc_id','$co_id')");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());