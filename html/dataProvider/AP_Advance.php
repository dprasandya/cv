<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AP_Advance
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
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ap_invoice.AP_Advance')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM ap_invoice_advance_s('$co_id') where doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
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
        if($params->vend_id<>''){
            $sql = "SELECT first 500 * FROM ap_invoice_advance_s('$co_id') where status=1 and vend_id='$params->vend_id' and outstanding_advance > '$params->outstanding_advance' $par_search order by timeedit desc";
        }else{
            $sql = "SELECT first 500 * FROM ap_invoice_advance_s('$co_id') where status=1 and outstanding_advance > '$params->outstanding_advance' $par_search order by timeedit desc";
        }
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
        $sql = "execute procedure ap_invoice_advance_i '$timeinput','$userinput','$params->status','$params->remarks','$params->tax_no','$tax_date','$params->tax_id','$params->reference_id','$params->nominal','$params->vend_id','$params->cflow_id','$params->cash_id','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $tax_date = $this->db->Date_Converter($params->tax_date);
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure ap_invoice_advance_u '$timeedit','$useredit','$params->status','$params->remarks','$params->tax_no','$tax_date','$params->tax_id','$params->reference_id','$params->nominal','$params->vend_id','$params->cflow_id','$params->cash_id','$params->doc_type','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from ap_invoice_advance where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());