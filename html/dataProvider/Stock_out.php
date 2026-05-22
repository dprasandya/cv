<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Stock_out
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
        /*$user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.stock.Stock_out')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }*/
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM stock_out_s('$params->doc_type','$co_id') where co_id='$co_id' $par_search order by timeedit desc";
       // print_r($sql);
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
        $sql = "SELECT * FROM warehouse_tx_rx where co_id='$co_id' and doc_type='T' and status=1 $par_search order by timeedit desc";
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
        if($params->traksi_type!='T'){
            $params->jam_mulai = Time::getLocalTime('H:i'); 
            $params->jam_selesai = Time::getLocalTime('H:i'); 
        }
        $sql = "execute procedure stock_out_i '$timeinput','$userinput','$params->status','$params->remarks','$params->traksi_type','$params->km_selesai','$params->km_mulai','$params->jam_selesai','$params->jam_mulai','$params->kendaraan_id','$params->ol_id','$params->station_id','$params->qty','$params->coa_id','$params->unit_id','$params->item_id','$params->doc_id_rm','$params->tbs_type','$params->vend_id','$params->afdeling_id','$params->warehouse_id','$params->project_id','$params->project_type','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        if($params->category=='PRODUCTION'){$params->afdeling_id=null;}
        else if($params->category=='AFDELING'){$params->doc_id_rm=null;}
        if($params->traksi_type!='TMK'){
            $params->jam_mulai = Time::getLocalTime('H:i'); 
            $params->jam_selesai = Time::getLocalTime('H:i'); 
        }
        $sql = "execute procedure stock_out_u '$timeedit','$useredit','$params->status','$params->remarks','$params->traksi_type','$params->km_selesai','$params->km_mulai','$params->jam_selesai','$params->jam_mulai','$params->kendaraan_id','$params->ol_id','$params->station_id','$params->qty','$params->coa_id','$params->unit_id','$params->item_id','$params->doc_id_rm','$params->tbs_type','$params->vend_id','$params->afdeling_id','$params->warehouse_id','$params->project_id','$params->project_type','$params->doc_type','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from stock_out_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from stock_out where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

    public function select_detail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM stock_out_detail_s('$params->item_type','$params->doc_id','$co_id') $par_search order by item_name asc";
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
    public function update_detail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $sql = "execute procedure stock_out_detail_u '$params->coa_id','$params->remarks','$params->qty','$params->item_type','$params->unit_id','$params->item_id','$params->afdeling_id','$params->warehouse_id','$params->costcode_id','$params->project_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());