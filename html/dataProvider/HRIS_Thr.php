<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');


class HRIS_Thr
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
        $closed_date = $this->db->Date_Converter($params->closed_date);
        $sql = "SELECT * FROM hris_thr_s('$user_usrname','$params->js_id','$params->ol_id','$params->company_id','$closed_date','$co_id') $par_search";
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
        $data = get_object_vars($params);
        $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['closed_date'] = $this->db->Date_Converter($params->closed_date);
        $data['join_date'] = $this->db->Date_Converter($params->join_date);
        unset($data['id'],$data['emp_name'],$data['ol_id'],$data['ol_name'],$data['js_id'],$data['js_name'],$data['company_id'],$data['company_name']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_thr', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());