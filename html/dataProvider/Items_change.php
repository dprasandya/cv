<?php

include_once (ROOT . '/classes/dbHelper.php');

class Items_change
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

    public function select_jurnal(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from (select a.*, b.item_name, c.item_name as item_name_new from items_change a
        left join items b on a.co_id=b.co_id and a.item_id=b.item_id and a.unit_id=b.unit_id
        left join items c on a.co_id=c.co_id and a.item_id_new=c.item_id and a.unit_id_new=c.unit_id
        ) where co_id='$co_id' and status=1 $par_search order by timeedit desc";
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
    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from items_change_s('$params->item_type','$params->project_id','$doc_date','$co_id') $par_search order by item_name asc";
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
        if($params->status=='true'||$params->status=='1') {
            $params->status='1';
            $sql = "execute procedure items_change_i '$timeinput','$userinput','$params->status','$params->remarks','$params->qty_new','$params->unit_id_new','$params->item_type','$params->item_id_new','$params->qty_stock','$params->unit_id','$params->item_type','$params->item_id','$params->warehouse_id','$params->costcode_id','$params->project_id','$doc_date','$co_id'";
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