<?php

include_once (ROOT . '/classes/dbHelper.php');

class Reclass_sharing_hpp
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
       
        $co_id = $_SESSION['user']['site'];
        if($params->doc_type=='M'||$params->doc_type=='TM') {
            $sql = "SELECT a.*, $params->total as nominal FROM items a
            where a.co_id='$co_id' and a.item_id='KSWT01'";
        }else{
            $sql = "SELECT a.*, (a.percentase/100)*$params->total as nominal, b.item_name FROM sharing_hpp a
            left join items b on a.co_id=b.co_id and a.item_id=b.item_id and a.unit_id=b.unit_id
            where a.co_id='$co_id'";
        }
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

        /*$total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);*/
    }
   
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());