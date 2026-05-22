<?php

include_once (ROOT . '/classes/dbHelper.php');

class JurnalStock_opname
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
        $sql = "SELECT * from (select a.*, b.item_name, c.project_name, d.costcode_name from stock_opname a
        left join items b on a.co_id=b.co_id and a.item_id=b.item_id and a.unit_id=b.unit_id
        left join project c on a.co_id=c.co_id and a.project_id=c.project_id
        left join costcode d on a.co_id=d.co_id and a.costcode_id=d.costcode_id
        ) where co_id='$co_id' $par_search order by timeedit desc";
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

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());