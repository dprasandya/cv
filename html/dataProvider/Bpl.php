<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Bpl
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.management_properti.Bpl')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM bpl_s('$params->tax_id','$params->bpl_id','$params->period','$co_id') where co_id='$co_id' $view_data $par_search order by unit_building_id asc";
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
        $doc_date = $this->db->Date_Converter($params->doc_date); $tax_date=$this->db->Date_Converter($params->tax_date);
        $params->status = 1;
        $sql = "execute procedure bpl_i '$timeinput','$userinput','$params->status','$tax_date','$params->tax_no','$params->tax_id','$params->total','$params->price','$params->qty','$params->qty_ending','$params->qty_begin','$params->cust_id','$params->area_m2','$params->project_id','$params->unit_building_id','$params->unit_id','$params->bpl_id','$params->registration_unit_id','$params->registration_id','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

    public function select_detail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM bpl_detail_s('$co_id') where co_id='$co_id' $par_search order by timeedit desc";
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


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());