<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AP_Payment
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
        if($params->field_search<>''){
            if($params->field_name=='for_doc_id'){
                $this->db->setSQL("select doc_id from ap_invoice_payment_detail where co_id='$co_id' and for_doc_id like upper('%".$params->field_search."%') ");
                $arrays = array();
                foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $array) {
                    $array = array_change_key_case($array);
                    array_push($arrays, $array['doc_id']);
                }
                $par_search =" and doc_id IN('".implode("','",$arrays)."')";
            }else {
                $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
            }

        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ap_invoice.AP_Payment')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $sql = "SELECT first 500 * FROM ap_invoice_payment_s('$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
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
        $sql = "execute procedure ap_invoice_payment_i '$timeinput','$userinput','$params->status','$params->remarks','$params->reference_id','$params->cflow_id','$params->cash_id','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure ap_invoice_payment_u '$timeedit','$useredit','$params->status','$params->remarks','$params->reference_id','$params->cflow_id','$params->cash_id','$params->doc_type','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from ap_invoice_payment_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from ap_invoice_payment where co_id='$params->co_id' and doc_id = '$params->doc_id'");
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
        $sql = "SELECT * from ap_invoice_payment_detail_s('$co_id') where co_id='$co_id' and doc_id='$params->doc_id' $par_search order by seq_id asc ";
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
        $sql = ("execute procedure ap_invoice_payment_detail_i '$params->coa_id','$params->costcode_id','$params->project_type','$params->project_id','$params->vend_id','$params->nominal','$params->remarks','$params->outstanding_advance','$params->for_doc_av','$params->outstanding_liability','$params->for_doc_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure ap_invoice_payment_detail_u '$params->coa_id','$params->costcode_id','$params->project_type','$params->project_id','$params->vend_id','$params->nominal','$params->remarks','$params->outstanding_advance','$params->for_doc_av','$params->outstanding_liability','$params->for_doc_id','$params->seq_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $sql =("execute procedure ap_invoice_payment_detail_d '$params->seq_id','$params->doc_id','$co_id' ");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());