<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_View_Office_location
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
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT a.*, a.status as active FROM hris_view_office_locations_s('$params->usrname','$co_id') a order by a.timeedit asc";
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
        $co_id = $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->active==''){$params->status='0';}else{$params->status='1';}
        $sql = ("execute procedure hris_view_office_locations_u('$timeedit','$useredit','$params->status','$params->ol_id','$params->usrname','$co_id')");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());