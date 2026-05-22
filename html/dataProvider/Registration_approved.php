<?php

include_once (ROOT . '/classes/dbHelper.php');

class Registration_approved
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
        $sql = "SELECT * from registration_approved_s('$co_id') where co_id='$co_id' $par_search order by seq_id desc";
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
        $co_id= $_SESSION['user']['site']; if($params->status==''){$params->status='0';}else{$params->status='1';}
        $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $approved_date = $this->db->Date_Converter($params->approved_date); $approved_by = $_SESSION['user']['usrname'];
        $sql = "execute procedure registration_approved_u '$timeedit','$useredit','$params->unit_building_id','$params->installment_advance','$params->payment_id','$approved_by','$approved_date','$params->status','$params->seq_id','$params->registration_type','$params->registration_id','$co_id' ";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());