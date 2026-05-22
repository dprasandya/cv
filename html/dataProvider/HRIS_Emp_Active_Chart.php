<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Emp_Active_Chart
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
        $co_id = $_SESSION['user']['site'];
        $sql = "select emp_company_id, count(*) as emp_active
        from hris_employee where co_id='$co_id' and status=1
        group by emp_company_id";
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
    

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());