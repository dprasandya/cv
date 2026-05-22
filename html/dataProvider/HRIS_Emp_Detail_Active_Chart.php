<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Emp_Detail_Active_Chart
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
        $sql = "select b.js_name, count(*) as emp_active
        from hris_employee a
        left join hris_job_status b on a.co_id=b.co_id and a.emp_js_id=b.js_id
        where a.status=1 and a.co_id='$co_id' and a.emp_company_id='$params->emp_company_id'
        group by b.js_name";
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