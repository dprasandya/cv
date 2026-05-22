<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Registration
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.marketing.Registration')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * from registration_s('$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $sql = "execute procedure registration_i '$timeinput','$userinput','$params->remarks','$params->cust_npwp','$params->cust_contact','$params->cust_name','$params->cust_id','$params->mobile_phone','$params->home_phone','$params->nationality','$params->city','$params->address','$params->merriage_status','$params->religion','$params->gender','$params->blood_type','$params->identity_no','$params->identity_type','$params->last_name','$params->first_name','$params->sales_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $sql = "execute procedure registration_u '$timeinput','$userinput','$params->remarks','$params->cust_npwp','$params->cust_contact','$params->cust_name','$params->cust_id','$params->mobile_phone','$params->home_phone','$params->nationality','$params->city','$params->address','$params->merriage_status','$params->religion','$params->gender','$params->blood_type','$params->identity_no','$params->identity_no_old','$params->identity_type','$params->last_name','$params->first_name','$params->sales_id','$params->registration_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function delete(stdClass $params){
        $co_id= $_SESSION['user']['site'];
        $sql="execute procedure registration_d '$params->registration_id','$co_id' ";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());