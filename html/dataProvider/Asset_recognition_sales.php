<?php

include_once (ROOT . '/classes/dbHelper.php');

class Asset_recognition_sales
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
        $sql = "SELECT * FROM asset_recognition_sales_s('$params->project_id','$co_id') where co_id='$co_id' $par_search order by unit_building_id asc";
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

    public function select_jurnal(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site']; $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "SELECT * FROM asset_recognition_sales_jurnal('$co_id') where co_id='$co_id' $par_search order by timeedit desc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); $last_depreciation_date = $this->db->Date_Converter($params->last_depreciation_date);
        $params->status='1';
        $sql = "execute procedure asset_recognition_sales_i '$timeinput','$userinput','$params->status','$params->remarks',null,'$params->total','$params->depreciation_month','$params->outstanding_month','$params->benefit_month','$params->live_month','$params->live_year','$params->age_id','$params->coa_id','$params->area_m2','$params->unit_building_id','$params->project_id','$params->for_doc_id','$doc_date','$co_id'";
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());