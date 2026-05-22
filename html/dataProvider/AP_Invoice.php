<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AP_Invoice
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ap_invoice.AP_Invoice')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM ap_invoice_s('$co_id') where co_id='$co_id' and doc_type<>'D' /*and doc_type in('P','F','G','O','A','K','S','V','T','B','I','L','H','W','R','E','M')*/ $view_data $par_search order by timeedit desc";
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
    public function select_holding(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ap_invoice.AP_Invoice_holding')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM ap_invoice_s('$co_id') where co_id='$co_id' and doc_type='D' /*and doc_type in('P','F','G','O','A','K','S','V','T','B','I','L','H','W','R','E','M')*/ $view_data $par_search order by timeedit desc";
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
        $sql = "SELECT first 500 * FROM ap_invoice_s('$co_id') where co_id='$co_id' and status=1 and outstanding_liability > '$params->outstanding_liability' $par_search order by timeedit desc";
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
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $tax_date = $this->db->Date_Converter($params->tax_date); $due_date = $this->db->Date_Converter($params->due_date);
        $sql = "execute procedure ap_invoice_i '$timeinput','$userinput','$params->kendaraan_id','$params->ol_id','$params->afdeling_id','$params->warehouse_id','$params->for_doc_id','$tax_date','$params->tax_no','$params->status','$params->remarks','$params->registration_id','$params->unit_building_id','$params->vend_id','$params->tax_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $tax_date = $this->db->Date_Converter($params->tax_date); $due_date = $this->db->Date_Converter($params->due_date);
        $sql = "execute procedure ap_invoice_u '$timeedit','$useredit','$params->kendaraan_id','$params->ol_id','$params->afdeling_id','$params->warehouse_id','$params->for_doc_id','$tax_date','$params->tax_no','$params->status','$params->remarks','$params->registration_id','$params->unit_building_id','$params->vend_id','$params->tax_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from ap_invoice_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from ap_invoice where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from jurnal where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from (select a.*, b.status, c.costcode_name from ap_invoice_detail a
         left join ap_invoice b on a.co_id=b.co_id and a.doc_id=b.doc_id
         left join costcode c on a.co_id=c.co_id and a.costcode_id=c.costcode_id
         )where co_id='$co_id' and doc_id='$params->doc_id' $par_search order by seq_id asc ";
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
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure ap_invoice_detail_i '$params->remarks','$params->unit_id','$params->total','$params->price','$params->qty','$params->coa_name','$params->coa_id','$params->costcode_id','$params->item_name','$params->item_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure ap_invoice_detail_u '$params->remarks','$params->unit_id','$params->total','$params->price','$params->qty','$params->coa_name','$params->coa_id','$params->costcode_id','$params->item_name','$params->item_id','$params->doc_id','$params->seq_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure ap_invoice_detail_d('$params->seq_id','$params->doc_id','$co_id')");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());