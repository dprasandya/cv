<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once(ROOT . '/classes/Sessions.php');
include_once (ROOT . '/dataProvider/Roles.php');
include_once(dirname(__FILE__) . '/dataProvider/Globals.php');

class Project
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
        $this->session = new Sessions();
        return;
    }

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.master.Project')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT project.*, status as active FROM project where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
        $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
    }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM project where co_id='$co_id' and status=1 $par_search order by timeedit desc";
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
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'project', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);
        if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'],$data['active']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'project', 'U', array('co_id'=>$params->co_id,'project_id' => $params->project_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from project where co_id='$params->co_id' and project_id = '$params->project_id'");
        $this->db->execLog();
        return $params;
    }

    public function setGlobal(stdClass $params)
    {
        $global = Globals::setGlobals();
        $global['project_id'] = $params->project_id;
        print 'globals = '. json_encode( $global ).';';
        $_SESSION['sites']['project'] = $params->project_id;
        //print_r('Project = "' . $params .'"');
       // print 'project = ' . json_encode($_SESSION['sites']['project']) . ';';
        return $params;
    }

}

//$r = new \CashBank();
//$st = new \stdClass();
//print '<pre>';
//print_r($r->update($st));