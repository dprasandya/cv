<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Budget
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.cashbank.Budget')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "select * from budget_s('$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
         return $rows;
       /* $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);*/
    }
    public function add(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        if($params->status==''){$params->status='0';}  $doc_date = $this->db->Date_Converter($params->doc_date);
        $sql = "execute procedure budget_i '$params->to_period','$params->from_period','$timeinput','$userinput','$params->status','$params->remarks','$params->standard','$params->actual','$params->nominal','$params->request_by','$params->afdeling_id','$params->doc_name','$doc_date','$co_id','$params->ol_id'";
       // print_r($sql);
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;

    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); 
        $data['doc_date'] = $this->db->Date_Converter($params->doc_date);
        unset($data['id'],$data['seq_id'],$data['afdeling_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }
        /*if($params->doc_type<>'K'){
            $data['afdeling_id']=null;
        }*/
        $sql = $this->db->sqlBind($data, 'budget', 'U', array('co_id'=>$params->co_id,'doc_id' => $params->doc_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;

    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from budget where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "select doc_id, doc_name from budget where co_id='$co_id' $par_search order by timeedit desc";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
         return $rows;
       /* $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array('totals'=>$total, 'rows'=>$rows);*/
    }
    
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());