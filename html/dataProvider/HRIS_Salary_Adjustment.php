<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Salary_Adjustment
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.employee.Salary_Adjustment')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM hris_salary_adjustment_s('$params->pos_id','$params->sc_id','$params->group_id','$params->js_id','$params->company_id','$co_id') a where a.co_id='$co_id' $view_data $par_search order by timeedit desc";
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
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->doc_date==''){
            $params->doc_date = Time::getLocalTime('Y-m-d H:i:s');
        }
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure hris_salary_adjustment_i '$timeinput','$userinput','$params->status','$params->remarks','$params->amount_new','$params->amount_old','$params->sc_id','$params->sc_type','$params->emp_id','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());