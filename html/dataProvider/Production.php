<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Production
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
    public function select_salesorder(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        if($params->field_search<>''){
            if($params->field_name=='for_doc_id'){
                $this->db->setSQL("select for_doc_id from production where co_id='$co_id' and doc_id like upper('%".$params->field_search."%') ");
                foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $array) {
                    $array = array_change_key_case($array);
                }
                $par_search =" and doc_id ='$array[for_doc_id]'";
            }else {
                $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
            }
        }
        $sql = "SELECT first 500 * FROM production_salesorder('$co_id') where co_id='$co_id' $par_search order by timeedit desc";
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
    public function popup(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $sql = "SELECT * from (select a.*, b.warehouse_name from production a
        left join warehouse b on a.co_id=b.co_id and a.warehouse_id=b.warehouse_id
        where a.status=1 and a.doc_type='RM') where co_id='$co_id' $par_search order by timeedit desc";
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