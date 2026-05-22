<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Bonus
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.employee.Bonus')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT a.*, a.status as active FROM hris_bonus_thr_s('$params->sc_id','$params->sub_period','$params->period','$params->js_id','$params->ol_id','$params->company_id','$co_id') a where a.co_id='$co_id' $view_data $par_search order by a.emp_id asc";
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

        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active'],$data['emp_name'],$data['emp_job_id'],$data['emp_job_desc']); $data['co_id']= $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['total'] = $data['nominal_01'] + $data['nominal_02'];
        $data['doc_date'] = $this->db->Date_Converter($params->doc_date);
        if($data['status']=='0'){
            $sql = "delete from HRIS_BONUS_THR where co_id='$params->co_id' and period='$params->period' and emp_id='$params->emp_id' and bt_type = '$params->bt_type' ";
        }else if($data['status']=='1'){

            $this->db->setSQL("SELECT count(*) total FROM HRIS_BONUS_THR WHERE co_id='$params->co_id' and period = '$params->period' AND emp_id = '$params->emp_id' and bt_type='$params->bt_type'");
            $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
            if($row['TOTAL'] == 0){
                $sql = $this->db->sqlBind($data, 'HRIS_BONUS_THR', 'I');
            }else{
                $sql = $this->db->sqlBind($data, 'HRIS_BONUS_THR', 'U', array('co_id'=>$params->co_id,'period' => $params->period,'emp_id' => $params->emp_id,'bt_type' => $params->bt_type));
            }
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());