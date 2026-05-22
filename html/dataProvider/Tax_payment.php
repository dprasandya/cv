<?php

include_once (ROOT . '/classes/dbHelper.php');

class Tax_payment
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
        $sql = "SELECT first 500 * from tax_payment_s('$params->doc_type','$co_id') $par_search order by doc_date asc";
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
        $doc_date = $this->db->Date_Converter($params->doc_date);
        if($params->status=='true'){
            $sql = "execute procedure tax_payment_i '$timeinput','$userinput','$params->remarks','1','$params->nominal','$params->cflow_id','$params->cash_id','$params->cust_id','$params->vend_id','$params->for_doc_id','$params->doc_type','$doc_date','$co_id'";
            $this->db->setSQL($sql);
            $this->db->execOnly();
        }
        return $params;
    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());