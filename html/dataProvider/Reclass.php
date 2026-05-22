<?php

include_once (ROOT . '/classes/dbHelper.php');

class Reclass
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
        $sql = "SELECT * FROM reclass_s('$params->reclass_type','$params->period','$co_id') where co_id='$co_id' $par_search order by coa_id asc";
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
        //print_r($params->sharing);
        if($params->sharing==''){$params->sharing=0;}
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure reclass_i '$params->sharing','$timeinput','$userinput','1','$params->remarks','$params->doc_id_rm','$params->warehouse_id','$params->afdeling_id','$params->coa_id','$params->total','$params->for_doc_id','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());