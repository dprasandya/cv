<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_LoanOffice
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
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.employee.LoanOffice')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM hris_loan_office_s('$co_id') where co_id='$co_id' $view_data $par_search order by doc_id desc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['name']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);  if($params->status==''){$params->status='0';}
        $sql = "execute procedure hris_loan_office_i '$timeinput','$userinput','$params->status','$params->remarks','$params->nominal_month','$params->total','$params->live_month','$params->live_year','$params->description','$params->emp_id','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['name']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date);  if($params->status==''){$params->status='0';}
        $sql = "execute procedure hris_loan_office_u '$timeedit','$useredit','$params->status','$params->remarks','$params->nominal_month','$params->total','$params->live_month','$params->live_year','$params->description','$params->emp_id','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("delete from hris_loan_office where  co_id='$co_id' and doc_id='$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());