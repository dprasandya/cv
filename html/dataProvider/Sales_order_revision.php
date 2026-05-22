<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Sales_order_revision
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.salesorder.Sales_order')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM SALESORDER_S('$co_id') where co_id='$co_id' and status=1 $view_data $par_search order by timeedit desc";
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
        if($params->status==''){$data['status']='0';}
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $due_date = $this->db->Date_Converter($params->due_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure salesorder_revision_u '$timeedit','$useredit','$params->remarks_revision','$params->remarks','$params->tax_id','$params->total','$params->total_price','$params->price_pph','$params->price_ppn','$params->price_extra','$params->price_socialization','$params->price_promotion','$params->price_transport','$params->price_loco','$params->qty','$params->unit_id','$params->item_id','$params->sales_id','$params->cust_po','$params->cust_id','$params->doc_type','$due_date','$doc_date', '$params->doc_id' ,'$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM SALESORDER_address_send_s('$params->doc_id','$co_id') where co_id='$co_id' $par_search order by seq_id desc";
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
    public function updatedetail(stdClass $params)
    {
        if($params->status==''){$data['status']='0';}
        $co_id= $_SESSION['user']['site']; if($params->status==''){$params->status='0';}
        $sql = "execute procedure SALESORDER_address_send_rev_u '$params->status','$params->qty','$params->remarks','$params->contact','$params->address','$params->city','$params->seq_id','$params->cust_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function selectdetail_ext(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM SALESORDER_marketing_ext_s('$params->doc_id','$co_id') where co_id='$co_id' $par_search order by sales_id asc";
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
    public function adddetail_ext(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure salesorder_marketing_ext_i '$params->qty','$params->sales_name','$params->sales_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail_ext(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure salesorder_marketing_ext_rev_u '$params->qty','$params->sales_name','$params->sales_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deletedetail_ext(stdClass $params){
        $co_id= $_SESSION['user']['site'];
        $sql = "execute procedure salesorder_marketing_ext_rev_d '$params->qty','$params->sales_name','$params->sales_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());