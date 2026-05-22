<?php

include_once (ROOT . '/classes/dbHelper.php');

class DocumentSetting
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
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM document_setting where co_id='$co_id' $par_search order by module asc";
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
        $data = get_object_vars($params);
        unset($data['id']); $data['co_id']= $_SESSION['user']['site'];
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'document_setting', 'U', array('co_id'=>$params->co_id,'module' => $params->module));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());