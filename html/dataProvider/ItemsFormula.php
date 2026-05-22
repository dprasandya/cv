<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class ItemsFormula
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
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (
        select a.*, b.formula_name from items_formula a
        left join formula b on a.co_id=b.co_id and a.formula_id=b.formula_id
) where co_id='$co_id' and item_id='$params->item_id' order by timeedit desc";
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
        unset($data['id'],$data['active'],$data['formula_name']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
            }
        }
        $sql = $this->db->sqlBind($data, 'items_formula', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'],$data['active'],$data['formula_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //$data[$key]=null;
            }
        }
        $sql = $this->db->sqlBind($data, 'items_formula', 'U', array('co_id'=>$params->co_id,'item_id' => $params->item_id, 'formula_id' => $params->formula_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $this->db->setSQL("delete from items_formula where co_id='$params->co_id' and item_id = '$params->item_id' and formula_id = '$params->formula_id'");
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());