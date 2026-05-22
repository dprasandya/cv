<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Premi_coa
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
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "SELECT * FROM hris_premi_coa_s('$user_usrname','$params->emp_id','$params->doc_type','$doc_date','$co_id') $par_search";
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
        $userinput= $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure hris_premi_coa_i '$params->emp_id','$params->doc_type','$doc_date','$params->total','$params->coa_id','$timeinput','$userinput','$co_id'";
        //print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput= $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure hris_premi_coa_i '$params->emp_id','$params->doc_type','$doc_date','$params->total','$params->coa_id','$timeinput','$userinput','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $this->db->setSQL("delete from hris_premi_coa where co_id='$params->co_id' and emp_id = '$params->emp_id'and doc_date = '$doc_date' and doc_type = '$params->doc_type'and coa_id = '$params->coa_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());