<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Work_order_progress
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
        if($params->field_search<>''){
            if($params->field_name=='doc_id'){
                $sql = "select for_doc_id from work_order_progress where co_id='$co_id' and doc_id like upper('%".$params->field_search."%') ";
                $this->db->setSQL($sql);
                foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $array) {
                    $array = array_change_key_case($array);
                }
                $par_search =" and for_doc_id ='$array[for_doc_id]'";
            }else {
                $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
            }
        }

        $sql = "SELECT first 500 * from work_order_progress_s('$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * from (select a.*, b.project_name, c.costcode_name, d.vend_name, e.tax_id, e.contract_no, f.tax_name from work_order_progress a 
        left join project b on a.co_id=b.co_id and a.project_id=b.project_id
        left join costcode c on a.co_id=c.co_id and a.costcode_id=c.costcode_id
        left join vendor d on a.co_id=d.co_id and a.vend_id=d.vend_id
        left join work_order e on a.co_id=e.co_id and a.for_doc_id=e.doc_id
        left join tax f on e.co_id=f.co_id and e.tax_id=f.tax_id) where co_id='$co_id' and status=1 and ".$params->outstanding." > 0 $par_search order by timeedit desc";
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