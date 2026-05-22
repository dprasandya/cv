<?php

include_once (ROOT . '/classes/dbHelper.php');

class Accumulation_Asset
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
        $sql = "SELECT * FROM asset_s('$params->period','$co_id') where co_id='$co_id' $par_search order by doc_id desc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function add(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure asset_p '$timeinput','$userinput','$doc_date','$params->depreciation_month','1','$params->remarks','$params->age_id','$params->coa_id','$params->afdeling_id','$params->unit_building_id','$params->project_id','$params->vend_id','$params->seq_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure asset_u '$params->total','$params->remarks','$params->age_id','$params->coa_id','$params->afdeling_id','$params->unit_building_id','$params->project_id','$params->vend_id','$doc_date','$params->seq_id','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());