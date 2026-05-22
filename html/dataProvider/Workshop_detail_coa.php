<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Workshop_detail_coa
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
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from (select a.*, b.status from workshop_detail_coa a
         left join workshop b on a.co_id=b.co_id and a.doc_id=b.doc_id
         )where co_id='$co_id' and doc_id='$params->doc_id' $par_search order by seq_id asc ";
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
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure workshop_detail_coa_i '$params->remarks','$params->total','$params->price','$params->qty','$params->coa_name','$params->coa_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure workshop_detail_coa_u '$params->remarks','$params->total','$params->price','$params->qty','$params->coa_name','$params->coa_id','$params->doc_id','$params->seq_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function delete(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure workshop_detail_coa_d('$params->seq_id','$params->doc_id','$co_id')");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());