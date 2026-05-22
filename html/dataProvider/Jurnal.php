<?php

include_once (ROOT . '/classes/dbHelper.php');

class Jurnal
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
        return;
    }

    public function select(stdClass $params)
    {
        $co_id = $_SESSION['user']['site'];
        $sql = "select a.*, b.coa_name FROM jurnal a
        left join coa b on a.co_id=b.co_id and a.coa_id=b.coa_id
        where a.co_id='$co_id' and a.doc_id='$params->doc_id' order by a.debit desc";
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
        $data = get_object_vars($params);
        unset($data['id']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['name']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'jurnal', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);  if($params->status==''){$data['status']='0';}
        unset($data['id']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['name']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'jurnal', 'U', array('co_id'=>$params->co_id,'doc_id' => $params->doc_id, 'seq_id' => $params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from jurnal where co_id='$params->co_id' and doc_id = '$params->doc_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());