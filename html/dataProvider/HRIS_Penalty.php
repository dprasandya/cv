<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Penalty
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
        $sql = "SELECT * FROM hris_penalty_s('$user_usrname','$params->company_id','$params->ol_id','$params->js_id','$doc_date','$co_id') $par_search";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $userinput= $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure hris_penalty_i '$timeinput','$userinput','$params->remarks','$params->nominal','$doc_date','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());