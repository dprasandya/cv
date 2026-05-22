<?php

include_once (ROOT . '/classes/dbHelper.php');

class Legal_unit_building
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
        $sql = "SELECT * from legal_unit_building_s('$params->unit_building_id','$params->project_id','$co_id') where co_id='$co_id' $par_search order by legal_id asc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $useredit = $_SESSION['user']['usrname'];  $timeinput = Time::getLocalTime('Y-m-d H:i:s') ; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); //if($params->status==''){$params->status='0';}else{$params->status='1';}
        $sql = "execute procedure legal_unit_building_i '$timeedit','$timeinput','$useredit','$userinput','$params->status','$params->remarks','$params->doc_no',null,'$params->legal_id','$params->unit_building_id','$params->project_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());