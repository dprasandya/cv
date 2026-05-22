<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Salary
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
        $sql = "SELECT * FROM hris_salary_s('$user_usrname','$params->group_id','$params->emp_id','$params->js_id','$params->ol_id','$params->company_id','$params->sub_period','$params->period','$co_id') $par_search";
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
        $userinput= $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $sql = "execute procedure hris_salary_i '$timeinput','$userinput','$params->emp_id','$params->sub_period','$params->period','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function select_detail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $sql = "SELECT * FROM hris_view_salary_report(null,'$params->emp_id','$params->js_id',null,'$params->company_id','$params->sub_period','$params->period','$co_id')";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;

    }
    public function onViewSalary($js_id)
    {
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $this->db->setSQL("select count(*) as total from hris_view_salary_js where co_id='$co_id' and js_id='$js_id' and status='1' and usrname='$user_usrname' ");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? '' : 1);

    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());