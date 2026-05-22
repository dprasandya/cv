<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Registration_unit_change
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

    public function select_view(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.marketing.Registration_unit_change')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from REGISTRATION_UNIT_CHANGE_VIEW('$co_id') where co_id='$co_id' $view_data $par_search order by identity_no desc";
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
    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from registration_unit_change_s('$params->project_id_old','$params->unit_building_id_old','$params->registration_id','$co_id') where co_id='$co_id' $par_search";
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
        if($params->status==''){$params->status='0';}  $billing_date = $this->db->Date_Converter($params->start_billing);
        $sql = "execute procedure registration_unit_change_i '$timeinput','$userinput','$params->status','$params->remarks_old','$params->outstanding_value_old','$params->installment_advance_old','$params->advance_value_old','$params->total_old','$params->total_price_old','$params->price_pph_old','$params->price_ppn_old','$params->price_old','$params->qty_old','$params->cash_id_old','$params->tax_id_old','$params->payment_id_old','$params->building_id_old','$params->area_m2_old','$params->floor_id_old','$params->facing_id_old','$params->cluster_id_old','$params->unit_building_id_old','$params->project_id_old','$billing_date','$params->remarks','$params->outstanding_value','$params->installment_advance','$params->advance_value','$params->total','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->cash_id','$params->tax_id','$params->payment_id','$params->building_id','$params->area_m2','$params->floor_id','$params->facing_id','$params->cluster_id','$params->unit_building_id','$params->project_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->status==''){$params->status='0';} $billing_date = $this->db->Date_Converter($params->start_billing);
        $sql = "execute procedure registration_unit_change_u '$timeedit','$useredit','$params->status','$params->remarks_old','$params->outstanding_value_old','$params->installment_advance_old','$params->advance_value_old','$params->total_old','$params->total_price_old','$params->price_pph_old','$params->price_ppn_old','$params->price_old','$params->qty_old','$params->cash_id_old','$params->tax_id_old','$params->payment_id_old','$params->building_id_old','$params->area_m2_old','$params->floor_id_old','$params->facing_id_old','$params->cluster_id_old','$params->unit_building_id_old','$params->project_id_old','$billing_date','$params->remarks','$params->outstanding_value','$params->installment_advance','$params->advance_value','$params->total','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->cash_id','$params->tax_id','$params->payment_id','$params->building_id','$params->area_m2','$params->floor_id','$params->facing_id','$params->cluster_id','$params->unit_building_id','$params->project_id','$params->seq_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from registration_unit_change where co_id='$params->co_id' and registration_id = '$params->registration_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        $this->db->setSQL("update unit_building set unit_building_status='UNSOLD' where co_id='$params->co_id' and unit_building_id = '$params->unit_building_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());