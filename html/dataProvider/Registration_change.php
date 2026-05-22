<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Registration_change
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.marketing.Registration_change')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from REGISTRATION_CHANGE_VIEW('$co_id') where co_id='$co_id' $view_data $par_search order by identity_no_old desc";
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
        $sql = "SELECT * from registration_change_s('$params->project_id','$params->unit_building_id','$params->registration_id','$co_id') where co_id='$co_id' $par_search order by identity_no_old desc";
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
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure registration_change_i '$timeinput','$userinput','$params->status','$params->remarks','$params->sales_id','$params->cust_contact_old','$params->cust_npwp_old','$params->cust_name_old','$params->cust_id_old','$params->mobile_phone_old','$params->home_phone_old','$params->nationality_old','$params->city_old','$params->address_old','$params->merriage_status_old','$params->religion_old','$params->gender_old','$params->blood_type_old','$params->last_name_old','$params->first_name_old','$params->identity_type_old','$params->identity_no_old','$params->area_m2','$params->floor_id','$params->building_id','$params->facing_id','$params->cluster_id','$params->unit_building_id','$params->project_id','$params->cust_contact','$params->cust_npwp','$params->cust_name','$params->cust_id','$params->mobile_phone','$params->home_phone','$params->nationality','$params->city','$params->address','$params->merriage_status','$params->religion','$params->gender','$params->blood_type','$params->last_name','$params->first_name','$params->identity_type','$params->identity_no','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure registration_change_u '$timeedit','$useredit','$params->status','$params->remarks','$params->sales_id','$params->cust_contact_old','$params->cust_npwp_old','$params->cust_name_old','$params->cust_id_old','$params->mobile_phone_old','$params->home_phone_old','$params->nationality_old','$params->city_old','$params->address_old','$params->merriage_status_old','$params->religion_old','$params->gender_old','$params->blood_type_old','$params->last_name_old','$params->first_name_old','$params->identity_type_old','$params->identity_no_old','$params->area_m2','$params->floor_id','$params->building_id','$params->facing_id','$params->cluster_id','$params->unit_building_id','$params->project_id','$params->cust_contact','$params->cust_npwp','$params->cust_name','$params->cust_id','$params->mobile_phone','$params->home_phone','$params->nationality','$params->city','$params->address','$params->merriage_status','$params->religion','$params->gender','$params->blood_type','$params->last_name','$params->first_name','$params->identity_type','$params->identity_no','$params->seq_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from registration_change where co_id='$params->co_id' and registration_id = '$params->registration_id' and seq_id='$params->seq_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());