<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Cashbon
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
    public function select_settlament(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        if($params->field_search<>''){
            if($params->field_name=='for_doc_id'){
                $this->db->setSQL("select for_doc_id from cashbon where co_id='$co_id' and doc_id like upper('%".$params->field_search."%') ");
                foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $array) {
                    $array = array_change_key_case($array);
                }
                $par_search =" and doc_id ='$array[for_doc_id]'";
            }else {
                $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
            }
        }
        $sql = "SELECT * FROM cashbon_settlament_s('$co_id') where co_id='$co_id' $par_search order by timeedit desc";
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.cashbank.Cashbon')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM cashbon_s('$co_id') where co_id='$co_id' and for_doc_id='$params->for_doc_id' $view_data $par_search order by timeedit desc";
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
        $sql = "execute procedure cashbon_i '$timeinput','$userinput','$params->status','$params->remarks','$params->cflow_id','$params->cash_id','$params->vend_id','$params->for_doc_id','$doc_date','$params->doc_type','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure cashbon_u '$timeedit','$useredit','$params->status','$params->remarks','$params->cflow_id','$params->cash_id','$params->vend_id','$params->for_doc_id','$doc_date','$params->doc_type','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from cashbon_detail where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from cashbon where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from jurnal where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

    public function selectdetail(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * from (select a.*,b.coa_name, c.status from cashbon_detail a
         left join coa b on a.co_id=b.co_id and a.coa_id=b.coa_id
         left join cashbon c on a.co_id=c.co_id and a.doc_id=c.doc_id)
         where co_id='$co_id' and doc_id='$params->doc_id' $par_search order by seq_id asc ";
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
        $sql = ("execute procedure cashbon_detail_i '$params->remarks','$params->nominal','$params->coa_id','$params->doc_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function updatedetail(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = ("execute procedure cashbon_detail_u '$params->remarks','$params->nominal','$params->coa_id','$params->doc_id','$params->seq_id','$co_id'");
        $this->db->setSQL($sql);
        $this->db->execOnly(false);
        return $params;
    }
    public function deletedetail(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("execute procedure cashbon_detail_d '$params->seq_id','$params->coa_id', '$params->doc_id', '$co_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());