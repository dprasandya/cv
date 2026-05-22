<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Mutation
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.Mutation.Mutation')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM hris_mutation where co_id='$co_id' $view_data $par_search order by seq_id desc";
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
        if($params->status==''){$params->status='0';}
        $co_id = $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $new_join_date = $this->db->Date_Converter($params->new_join_date);
        $sql = "execute procedure hris_mutation_i '$timeinput','$userinput','$params->status','$new_join_date','$params->new_pos_id','$params->new_ol_id','$params->new_js_id','$params->new_job_id','$params->new_dept_id','$params->new_company_id','$params->old_pos_id','$params->old_ol_id','$params->old_js_id','$params->old_job_id','$params->old_dept_id','$params->old_company_id','$params->mutation_type','$params->emp_name','$params->seq_id','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        if($params->status==''){$params->status='0';}
        $co_id = $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $new_join_date = $this->db->Date_Converter($params->new_join_date);
        $sql = "execute procedure hris_mutation_u '$timeedit','$useredit','$params->status','$new_join_date','$params->new_pos_id','$params->new_ol_id','$params->new_js_id','$params->new_job_id','$params->new_dept_id','$params->new_company_id','$params->old_pos_id','$params->old_ol_id','$params->old_js_id','$params->old_job_id','$params->old_dept_id','$params->old_company_id','$params->mutation_type','$params->emp_name','$params->seq_id','$params->emp_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from hris_mutation where co_id='$params->co_id' and emp_id = '$params->emp_id' and seq_id => '$params->seq_id'");
        $this->db->execLog();
        return $params;
    }


}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());