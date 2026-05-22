<?php

include_once (ROOT . '/classes/dbHelper.php');

class Registration_unit_co
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
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from registration_unit_co_s('$co_id') where co_id='$co_id' $par_search order by doc_id asc";
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
    public function select_detail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "select * from registration_unit_co_detail_s('$params->cust_id','$params->doc_id','$co_id') where co_id='$co_id' $par_search";
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
        $start_rent = $this->db->Date_Converter($params->start_rent);
        $end_rent = $this->db->Date_Converter($params->end_rent);
        $sql = ""; //"execute procedure registration_unit_ci_i '$timeinput','$userinput','$params->remarks','$end_rent','$start_rent','$params->advance_value','$params->total','$params->total_price','$params->price_sc','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->tax_id','$params->area_m2','$params->floor_id','$params->building_id','$params->cluster_id','$params->project_id','$params->facing_id','$params->unit_building_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $start_rent = $this->db->Date_Converter($params->start_rent);
        $end_rent = $this->db->Date_Converter($params->end_rent);
        if($params->status=='0'){$doc_date=$this->db->Date_Converter($timeedit);} else {$doc_date = $this->db->Date_Converter($params->doc_date);}
        $sql = "execute procedure registration_unit_co_u '$timeedit','$useredit','$params->status','$params->remarks','$params->payment_value','$params->refund_cflow_id','$params->cflow_id','$params->cash_id','$end_rent','$start_rent','$params->advance_value','$params->total','$params->total_price','$params->price_sc','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->tax_id','$params->area_m2','$params->floor_id','$params->building_id','$params->cluster_id','$params->project_id','$params->facing_id','$params->unit_building_id','$doc_date','$params->doc_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());