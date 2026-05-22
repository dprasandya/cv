<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Workshop_detail
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

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM workshop_detail_s('$params->item_type','$params->doc_id','$co_id') $par_search order by item_name asc";
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
        $co_id = $_SESSION['user']['site'];
        $sql = "execute procedure workshop_detail_u '$params->coa_id','$params->remarks','$params->qty','$params->item_type','$params->unit_id','$params->item_id','$params->warehouse_id','$params->doc_id','$co_id'";
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());