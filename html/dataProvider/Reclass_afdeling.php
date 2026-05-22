<?php

include_once (ROOT . '/classes/dbHelper.php');

class Reclass_afdeling
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
        $sql = "SELECT * FROM reclass_tm_s('$params->period','$co_id') where co_id='$co_id' $par_search order by afdeling_id asc";
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
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (select a.*, b.afdeling_name from reclass_afdeling a
        left join afdeling b on a.co_id=b.co_id and a.afdeling_id=b.afdeling_id
        where a.status=1 and a.co_id='$co_id') 
        where co_id='$co_id' $par_search order by timeedit desc";
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
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure reclass_tm_i '$timeinput','$userinput','$params->remarks','$params->total','$params->coa_id','$params->afdeling_id','$doc_date','$co_id'";
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function select_detail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "select * from reclass_afdeling_detail_s('$params->afdeling_id','$doc_date','$params->doc_id','$co_id')";
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
    public function add_detail(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $for_doc_date = $this->db->Date_Converter($params->for_doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure reclass_afdeling_detail_i '$timeinput','$timeinput','$params->status','$params->nominal','$params->remarks','$params->afdeling_id','$params->vend_id','$for_doc_date','$params->for_doc_id','$params->doc_id','$co_id'";
       // print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());