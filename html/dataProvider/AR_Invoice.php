<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class AR_Invoice
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
                $this->db->setSQL("select unit_building_id from ar_sale where co_id='$co_id' and doc_id like upper('%".$params->field_search."%') ");
                foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $array) {
                    $array = array_change_key_case($array);
                }
                $par_search =" and unit_building_id ='$array[unit_building_id]'";
            }else {
                $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
            }
        }
        $sql = "SELECT first 500 * from ar_sale_s('$co_id') where co_id='$co_id' $par_search order by registration_id desc";
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
        $sql = "select a.*, b.cust_name, c.project_name, d.costcode_name, e.unit_building_name from(
        select x.co_id, x.doc_date, x.doc_id, x.cust_id, x.project_type, x.project_id, x.unit_building_id, x.costcode_id, x.tax_id, y.payment_id, x.outstanding_receivable, x.remarks
        from ar_sale x
        left join registration_unit y on x.co_id=y.co_id and x.registration_id=y.registration_id and x.registration_unit_id=y.seq_id
        where x.status=1
        union all
        select co_id, doc_date, doc_id, cust_id, 'N' as project_type, project_id, unit_building_id, null as costcode_id, tax_id, null as payment_id, outstanding_receivable, remarks
        from bpl where status=1
        union all
        select co_id, doc_date, doc_id, cust_id, 'N' as project_type, project_id, unit_building_id, null as costcode_id, tax_id, null as payment_id, outstanding_receivable, remarks
        from service_charge where status=1
        union all
        select co_id, doc_date, doc_id, cust_id, 'P' as project_type, project_id, unit_building_id, null as costcode_id, tax_id, null as payment_id, outstanding_receivable, remarks
        from generate_room_rate where status=1
        ) a
        left join customer b on a.co_id=b.co_id and a.cust_id=b.cust_id
        left join project c on a.co_id=c.co_id and a.project_id=c.project_id
        left join costcode d on a.co_id=d.co_id and a.costcode_id=d.costcode_id
        left join unit_building e on a.co_id=e.co_id and a.unit_building_id=e.unit_building_id
        where a.co_id='$co_id' and a.outstanding_receivable > '$params->outstanding_receivable' $par_search order by a.doc_id desc";
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
    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        $co_id = $_SESSION['user']['site'];
        if($params->doc_type=='N'){//generate_billing
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Invoice')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_detail_s('$params->registration_unit_id','$params->registration_id','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='A'){// add billing
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Add_Billing')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_add_billing_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='I'){// ar sale item
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Sale_Items')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_items_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='C'){// Coffee shop
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Coffee_shop')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_items_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='H'){// House Keeping
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_House_Keeping')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_add_billing_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='D'){// Drug Store
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Drug_Store')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_add_billing_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='B'){// Business Center
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Business_Center')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_add_billing_s('$params->doc_type','$co_id') where co_id='$co_id' and doc_type='$params->doc_type' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='S'){// ar room service
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Sale_Service')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_items_s('$params->doc_type','$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='P'){// ar room service
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_PUB')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_items_s('$params->doc_type','$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
        }else if($params->doc_type=='Q'){// ar banquete
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.ar_invoice.AR_Banquete')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
            $sql = "SELECT * from ar_sale_items_s('$params->doc_type','$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
    public function adddetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $due_date = $this->db->Date_Converter($params->due_date);
        if($params->status==''){$params->status='0';} $tax_date = $this->db->Date_Converter($params->tax_date);
        if($params->doc_type=='N'){//ar sale
            $sql = "execute procedure ar_sale_detail_i '$timeinput','$userinput','$params->status','$params->remarks','$params->coa_add_billing','$tax_date','$params->tax_no','$params->receivable','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty_invoice','$params->qty_loses','$params->qty','$params->unit_id','$params->item_id','$params->warehouse_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->for_doc_id','$params->doc_type','$due_date','$doc_date','$co_id'";
        }else if($params->doc_type=='A' || $params->doc_type=='H' || $params->doc_type=='D' || $params->doc_type=='B') {// A =add billing, H = House Keeping, D = Drug Store, B = Business Center
            $sql = "execute procedure ar_add_billing_i '$timeinput','$userinput','$params->status','$params->remarks','$params->for_doc_id','$params->unit_building_id','$params->coa_add_billing','$tax_date','$params->tax_no','$params->receivable','$params->total_price','$params->price_sc','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->unit_id','$params->costcode_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$co_id'";
        }else if($params->doc_type=='I'||$params->doc_type=='C'||$params->doc_type=='S'||$params->doc_type=='P'||$params->doc_type=='Q') {// coffe shop, S= Room Service, P = PUB, Q= Banquete
            $sql = "execute procedure ar_sale_items_i '$timeinput','$userinput','$params->status','$params->remarks','$params->table_id','$params->for_doc_id','$params->unit_building_id','$tax_date','$params->tax_no','$params->warehouse_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$co_id'";

        }
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $due_date = $this->db->Date_Converter($params->due_date);
        if($params->status==''){$params->status='0';} $tax_date = $this->db->Date_Converter($params->tax_date);
        if($params->doc_type=='N'){//ar sale
            $sql = "execute procedure ar_sale_detail_u '$timeedit','$useredit','$params->status','$params->remarks','$params->coa_add_billing','$tax_date','$params->tax_no','$params->receivable','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty_invoice','$params->qty_loses','$params->qty','$params->unit_id','$params->item_id','$params->warehouse_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->for_doc_id','$params->doc_type','$due_date','$doc_date','$params->doc_id','$co_id'";
        }else if($params->doc_type=='A' || $params->doc_type=='H' || $params->doc_type=='D' || $params->doc_type=='B') {// A =add billing, H = House Keeping, D = Drug Store, B = Business Center
            $sql = "execute procedure ar_add_billing_u '$timeedit','$useredit','$params->status','$params->remarks','$params->for_doc_id','$params->unit_building_id','$params->coa_add_billing','$tax_date','$params->tax_no','$params->receivable','$params->total_price','$params->price_sc','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->unit_id','$params->costcode_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$params->doc_id','$co_id'";
        }else if($params->doc_type=='I'||$params->doc_type=='C'||$params->doc_type=='S'||$params->doc_type=='P'||$params->doc_type=='Q'){// coffee shop, S= Room Service, P = PUB, Q= Banquete
            $sql = "execute procedure ar_sale_items_u '$timeedit','$useredit','$params->status','$params->remarks','$params->table_id','$params->for_doc_id','$params->unit_building_id','$tax_date','$params->tax_no','$params->warehouse_id','$params->sales_id','$params->cust_id','$params->tax_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$due_date','$doc_date','$params->doc_id','$co_id'";
        }
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("delete from ar_sale_detail where co_id='$co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from ar_sale where co_id='$co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from jurnal where co_id='$co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

    public function select_address_send(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from ar_sale_address_send_s('$params->doc_id','$co_id') where co_id='$co_id' $par_search order by seq_id desc";
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

    public function update_address_send(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $sql = "execute procedure ar_sale_address_send_u '$params->price_exc','$params->qty_loses','$params->qty','$params->remarks','$params->contract','$params->address','$params->city','$params->seq_id','$params->cust_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());