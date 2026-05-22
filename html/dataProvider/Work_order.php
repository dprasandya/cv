<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Work_order
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
    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * from (select a.*, b.project_name, c.costcode_name, d.vend_name, f.tax_name from work_order a 
        left join project b on a.co_id=b.co_id and a.project_id=b.project_id
        left join costcode c on a.co_id=c.co_id and a.costcode_id=c.costcode_id
        left join vendor d on a.co_id=d.co_id and a.vend_id=d.vend_id
        left join tax f on a.co_id=f.co_id and a.tax_id=f.tax_id) where co_id='$co_id' and status=1 and retention_value > 0 and outstanding_retention > 0 $par_search order by timeedit desc";
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
    public function ContractNoPopup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "select distinct contract_no from work_order where co_id='$co_id' and status=1 and upper(contract_no) like upper('%".$params->query."%') $par_search order by contract_no asc";
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
    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.project.Work_order')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * from work_order_s('$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $start_date = $this->db->Date_Converter($params->start_date); $end_date = $this->db->Date_Converter($params->end_date);
        $contract_date = $this->db->Date_Converter($params->contract_date);
        $sql = "execute procedure work_order_i '$timeinput','$userinput','$params->status','$params->remarks','$params->unit_building_id','$end_date','$start_date','$params->tax_id','$params->retention_value','$params->retention_prs','$params->contract_value','$contract_date','$params->contract_no','$params->vend_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $userinput = $_SESSION['user']['usrname']; $timeinput = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $start_date = $this->db->Date_Converter($params->start_date); $end_date = $this->db->Date_Converter($params->end_date);
        $contract_date = $this->db->Date_Converter($params->contract_date);
        $sql = "execute procedure work_order_u '$timeinput','$userinput','$params->status','$params->remarks','$params->unit_building_id','$end_date','$start_date','$params->tax_id','$params->retention_value','$params->retention_prs','$params->contract_value','$contract_date','$params->contract_no','$params->vend_id','$params->costcode_id','$params->project_type','$params->project_id','$params->doc_type','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from work_order_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from work_order where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());