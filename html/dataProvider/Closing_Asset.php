<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class Closing_Asset
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
        if($this->url->getPerm_Key_View($user_id,'App.view.transactions.asset.Closing_Asset')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM closing_aset_s('$co_id') where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $sql = "SELECT first 500 * FROM (
            select a.*, e.coa_name, f.project_name, g.unit_building_name
            from asset a
            left join closing_aset b on a.co_id=b.co_id and a.doc_id=b.for_doc_id and a.coa_id=b.coa_id
            left join joining_asset_detail c on a.co_id=c.co_id and a.doc_id=c.for_doc_id and a.coa_id=c.coa_id
            left join asset_age_changing d on a.co_id=d.co_id and a.doc_id=d.for_doc_id and a.coa_id=d.coa_id
            left join coa e on a.co_id=e.co_id and a.coa_id=e.coa_id
            left join project f on a.co_id=f.co_id and a.project_id=f.project_id
            left join unit_building g on a.co_id=g.co_id and a.unit_building_id=g.unit_building_id
            where b.doc_id is null and c.doc_id is null and d.doc_id is null and coalesce(a.afdeling_id,'')=''
        ) where co_id='$co_id' $par_search order by doc_id desc";
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
        $sql = "execute procedure closing_aset_i '$timeinput','$userinput','$params->status','$params->remarks','$params->selling_price','$params->cflow_id','$params->cash_id','$params->coa_revenue','$params->coa_id','$params->unit_building_id','$params->project_id','$params->for_doc_id','$doc_date','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execOnly();
        return $params;
    }
    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site']; $useredit = $_SESSION['user']['usrname']; $timeedit = Time::getLocalTime('Y-m-d H:i:s') ;
        $doc_date = $this->db->Date_Converter($params->doc_date); if($params->status==''){$params->status='0';}
        $sql = "execute procedure closing_aset_u '$timeedit','$useredit','$params->status','$params->remarks','$params->selling_price','$params->cflow_id','$params->cash_id','$params->coa_revenue','$params->coa_id','$params->unit_building_id','$params->project_id','$params->for_doc_id','$doc_date','$params->doc_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from jurnal where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        $this->db->setSQL("delete from closing_aset where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());