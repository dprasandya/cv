<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Cashbook
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
        if($params->doc_type=='I'){
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.cashbank.Cashbook_in')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
        }
        else if($params->doc_type=='O'){
            if($this->url->getPerm_Key_View($user_id,'App.view.transactions.cashbank.Cashbook_out')<>1){
                $view_data = "and userinput ='$user_usrname'";
            }
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT FIRST 500 * FROM cashbook_s('$params->doc_type','$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        if($params->doc_type=='I'){
            $sql = "execute procedure cashbook_in_i '$timeinput','$userinput','$params->status','$params->remarks','$params->unit_building_id','$params->cflow_id','$params->cash_id','$params->vend_id','$params->cust_id','$params->doc_type','$doc_date','$params->costcode_id','$params->project_type','$params->project_id','$co_id'";
        }else if($params->doc_type=='O'){
            $sql = "execute procedure cashbook_ot_i '$timeinput','$userinput','$params->status','$params->remarks','$params->afdeling_id','$params->ol_id','$params->unit_building_id','$params->cflow_id','$params->cash_id','$params->vend_id','$params->cust_id','$params->doc_type','$doc_date','$params->costcode_id','$params->project_type','$params->project_id','$co_id'";
        } 
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        if($params->doc_type=='I'){
            $sql = "execute procedure cashbook_in_u '$timeedit','$useredit','$params->status','$params->remarks','$params->unit_building_id','$params->cflow_id','$params->cash_id','$params->vend_id','$params->cust_id','$params->doc_type','$doc_date','$params->doc_id','$params->costcode_id','$params->project_type','$params->project_id','$co_id'";
        }else if($params->doc_type=='O'){
            $sql = "execute procedure cashbook_ot_u '$timeedit','$useredit','$params->status','$params->remarks','$params->afdeling_id','$params->ol_id','$params->unit_building_id','$params->cflow_id','$params->cash_id','$params->vend_id','$params->cust_id','$params->doc_type','$doc_date','$params->doc_id','$params->costcode_id','$params->project_type','$params->project_id','$co_id'";
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from cashbook_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from cashbook where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from jurnal where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

    public function selectdetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = "select a.*,b.coa_name, c.costcode_name from cashbook_detail a
         left join coa b on a.co_id=b.co_id and a.coa_id=b.coa_id
         left join costcode c on a.co_id=c.co_id and a.costcode_id=c.costcode_id
         where a.co_id='$co_id' and a.doc_id='$params->doc_id' order by a.seq_id asc ";
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
    public function adddetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure cashbank_detail_i '$params->remarks','$params->nominal','$params->coa_id','$params->costcode_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure cashbank_detail_u '$params->remarks','$params->nominal','$params->coa_id','$params->costcode_id','$params->doc_id','$params->seq_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly(false);
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("execute procedure cashbank_detail_d('$params->seq_id','$params->doc_id','$co_id')");
        $this->db->execLog();
        return $params;
    }

    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM (
        select a.co_id, a.doc_id, a.doc_date, a.doc_type, a.nominal, a.remarks, a.timeedit, iif(coalesce(a.vend_id,'')<>'', a.vend_id, a.cust_id) as vend_cust_id, iif(coalesce(a.vend_id,'')<>'', b.vend_name, c.cust_name) as vend_cust_name
        from cashbook a
        left join vendor b on a.co_id=b.co_id and a.vend_id=b.vend_id
        left join customer c on a.co_id=c.co_id and a.cust_id=c.cust_id
        where a.co_id='$co_id' and a.status=1
        ) where co_id='$co_id' $par_search order by timeedit desc  ";
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