<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Salary_correction
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
        $co_id = $_SESSION['user']['site']; $user_usrname = $_SESSION['user']['usrname'];
        $sql = "SELECT * FROM hris_salary_correction_s('$user_usrname','$co_id') where co_id='$co_id' $par_search order by timeedit desc";
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
        $co_id= $_SESSION['user']['site'];
        $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure hris_salary_correction_i('$timeinput','$userinput','$params->status','$params->amount','$params->remarks','$params->emp_id','$doc_date','$co_id')";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure hris_salary_correction_u('$timeedit','$useredit','$params->status','$params->amount','$params->remarks','$params->emp_id','$doc_date','$params->doc_id','$co_id')";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_salary_correction where co_id='$params->co_id' and doc_id='$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());