<?php

include_once (ROOT . '/classes/dbHelper.php');

class Registration_unit
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
        $sql = "SELECT * from registration_unit_s('$params->registration_id','$co_id') where co_id='$co_id' $par_search order by seq_id desc";
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
        $start_billing = $this->db->Date_Converter($params->start_billing);
        $sql = "execute procedure registration_unit_i '$timeinput','$userinput','$params->remarks','$params->cash_id','$start_billing','$params->outstanding_value','$params->installment_advance','$params->advance_value','$params->total','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->payment_id','$params->tax_id','$params->area_m2','$params->floor_id','$params->building_id','$params->cluster_id','$params->project_id','$params->facing_id','$params->unit_building_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $start_billing = $this->db->Date_Converter($params->start_billing);
        $sql = "execute procedure registration_unit_u '$timeedit','$useredit','$params->remarks','$params->cash_id','$start_billing','$params->outstanding_value','$params->installment_advance','$params->advance_value','$params->total','$params->total_price','$params->price_pph','$params->price_ppn','$params->price','$params->qty','$params->payment_id','$params->tax_id','$params->area_m2','$params->floor_id','$params->building_id','$params->cluster_id','$params->project_id','$params->facing_id','$params->unit_building_id','$params->seq_id','$params->registration_id','$co_id'";

        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from registration_unit where co_id='$params->co_id' and registration_id = '$params->registration_id' and seq_id='$params->seq_id'");
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