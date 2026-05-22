<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Approved_Asset_management
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
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM HRIS_APP_ASSET_MANAGEMENT_S('$co_id') $par_search order by request_date, time_in asc";
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
        $user_id = $_SESSION['user']['id'];
        $co_id= $_SESSION['user']['site'];
        if($params->status==''){$params->status='0';}
        $approved_date = $this->db->Date_Converter($params->approved_date);
        $sql = "execute procedure hris_app_asset_management_u '$params->driver_id','$params->asset_id','$params->asset_type','$user_id','$params->status','$approved_date','$params->seq_id','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());