<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Registration_unit_ci_advance
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

        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM ar_sale_advance_s('$params->cust_id','$co_id') order by timeedit desc";
        //print_r($sql);
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $tax_date = $this->db->Date_Converter($params->tax_date);
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure ar_sale_advance_i '$timeinput','$userinput','$params->status','$params->remarks','$params->tax_no','$tax_date','$params->tax_id','$params->nominal','$params->unit_building_id','$params->cust_id','$params->cflow_id','$params->cash_id','$params->for_doc_id','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $tax_date = $this->db->Date_Converter($params->tax_date);
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure ar_sale_advance_u '$timeedit','$useredit','$params->status','$params->remarks','$params->tax_no','$tax_date','$params->tax_id','$params->nominal','$params->unit_building_id','$params->cust_id','$params->cflow_id','$params->cash_id','$params->for_doc_id','$params->doc_type','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from ar_sale_advance where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());