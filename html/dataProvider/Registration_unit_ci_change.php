<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Registration_unit_ci_change
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
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.marketing.Registration_unit_change')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $sql = "SELECT * from registration_unit_ci_change_s('$co_id') where co_id='$co_id' $view_data $par_search order by seq_id desc";
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
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $start_rent = $this->db->Date_Converter($params->start_rent);
        $end_rent = $this->db->Date_Converter($params->end_rent);
        $doc_date = $this->db->Date_Converter($params->doc_date);  //if($params->status==''){$params->status='0';}else{$params->status='1';}
        $sql = "execute procedure registration_unit_ci_change_u '$timeedit','$useredit','$params->remarks','$params->category','$params->doc_type','$params->pax','$params->room_service','$params->voucher_id','$params->compliment','$params->co_account','$params->advance_cflow_id','$params->advance_cash_id','$end_rent','$start_rent','$params->advance_value','$params->total','$params->total_price','$params->price_sc','$params->price_pph','$params->price_ppn','$params->price','$params->voucher_value','$params->price_brutto','$params->qty','$params->tax_id','$params->area_m2','$params->floor_id','$params->building_id','$params->rt_id','$params->cluster_id','$params->project_id','$params->facing_id','$params->unit_building_id','$doc_date','$params->doc_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());