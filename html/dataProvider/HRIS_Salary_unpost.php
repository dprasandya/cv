<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Salary_unpost
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
        $sql = "SELECT * FROM hris_salary_unpost_s('$user_usrname',$params->sub_period,'$params->period','$params->js_id','$params->ol_id','$params->company_id','$co_id') $par_search";
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
        $sql = "execute procedure hris_salary_unpost_i '$params->emp_id','$params->sub_period','$params->period','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());