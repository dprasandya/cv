<?php

include_once (ROOT . '/classes/dbHelper.php');

class Roles
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


    public function hasRolePerms($pKey, $rKey)
    {
        $this->db->setSQL("SELECT count(*) total FROM acl_role_perms WHERE (role_key = '$rKey') AND (perm_key = '$pKey')");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? false : true);
    }

    public function UserhasRolePerms($pKey, $rKey)
    {

        $this->db->setSQL("SELECT count(*) total FROM acl_user_perms WHERE (user_id = '$rKey') AND (perm_key = '$pKey')");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? false : true);
    }

    public function popup(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        if($params->model=='role'){
            $sql = "SELECT * from (select role_key as id, role_name as name FROM acl_roles) $par_search order by id asc";
        }
        else if($params->model=='user'){
            $sql = "SELECT * from (select id, usrname as name FROM users) order by id asc";
        }
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
    public function getRole(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $sql = "SELECT * FROM acl_roles $par_search order by id asc";
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

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addRole(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_roles', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updateRole(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_roles', 'U', array('id' => $params->id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function deleteRole(stdClass $params)
    {
        $sql = "DELETE FROM acl_roles WHERE id='$params->id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getTypes(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $sql = "SELECT * FROM acl_types $par_search order by id asc";

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
    public function addTypes(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_types', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function updateTypes(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_types', 'U', array('id' => $params->id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function deleteTypes(stdClass $params)
    {
        $sql = "DELETE FROM acl_types WHERE id='$params->id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function popupTypes(stdClass $params)
    {
        $sql = "SELECT * FROM acl_types order by serial_number asc";
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


    public function getPermissions(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $sql = "SELECT * FROM acl_permissions $par_search order by id asc";
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

    public function addPermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_permissions', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function updatePermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'acl_permissions', 'U', array('id'=>$params->id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deletePermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_permissions WHERE (id = '$params->id')";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getRolePermissions(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $sql = "SELECT * FROM acl_role_perms_s('$params->role_key') $par_search order by id asc";
        //$sql = "SELECT * FROM acl_permissions $par_search order by id asc";
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

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addRolePermissions(stdClass $params)
    {
        $data = get_object_vars($params); //if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'], $data['seq'],$data['perm_name'],$data['perm_cat'],$data['perm_remarks']);
        if ($this->hasRolePerms($params['perm_key'], $params['role_key'])) {
            $sql = $this->db->sqlBind($data, 'acl_role_perms', 'U', array('id' => $params->id));
        } else {
            $sql = $this->db->sqlBind($data, 'acl_role_perms', 'I');
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function updateRolePermissions(stdClass $params)
    {
        $data = get_object_vars($params); //if($params->status==''){$data['status']='0';}else{$data['status']='1';}
        unset($data['id'], $data['seq'],$data['perm_name'],$data['perm_cat'],$data['perm_remarks']);
        if ($this->hasRolePerms($data['perm_key'], $data['role_key'])) {
            $sql = $this->db->sqlBind($data, 'acl_role_perms', 'U', array('id' => $params->id));
        } else {
            $sql = $this->db->sqlBind($data, 'acl_role_perms', 'I');
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteRolePermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_role_perms WHERE (id = '$params->id')";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * Function: getFilterEncountersBillingData
     * The first call to populate the dataGrid on the Billing panel
     * also it will be used to filter the data by passing parameters
     * from extjs.
     */
    public function getUserPermissions(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "where upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        if($params->user_id==''){$params->user_id=0;}
        $sql = "SELECT * FROM acl_user_perms_s('$params->user_id') $par_search order by user_id, id asc";
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

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addUserPermissions(stdClass $params)
    {

        $data = get_object_vars($params);
        unset($data['id'], $data['seq'],$data['perm_name'],$data['perm_cat'],$data['perm_remarks']);
        if ($this->UserhasRolePerms($params['perm_key'], $params['user_id'])) {
            $sql = $this->db->sqlBind($data, 'acl_user_perms', 'U', array('id' => $params->id));
        } else {
            $sql = $this->db->sqlBind($data, 'acl_user_perms', 'I');
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateUserPermissions(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['seq'],$data['perm_name'],$data['perm_cat'],$data['perm_remarks']);
        if ($this->UserhasRolePerms($data['perm_key'], $data['user_id'])) {
            $sql = $this->db->sqlBind($data, 'acl_user_perms', 'U', array('id' => $params->id));
        } else {
            $sql = $this->db->sqlBind($data, 'acl_user_perms', 'I');
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function deleteUserPermissions(stdClass $params)
    {
        $sql = "DELETE FROM acl_user_perms WHERE (id = '$params->id')";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

    public function getcRoles()
    {
        $this->db->setSQL("SELECT id, role_name FROM acl_roles ORDER BY role_name");
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }
    public function getPerm_Key($params)
    {
        $user_id = $_SESSION['user']['id'];
        $sql = "SELECT perm_key FROM acl_perm_key_permissions('$user_id') WHERE perm_cat='reports'";
        $this->db->setSQL($sql);
        $rows = array();
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row['perm_key']);
        }
        return $rows;
    }
    public function getPerm_Key_Btn($params)
    {
        $user_id = $_SESSION['user']['id'];
        $this->db->setSQL("SELECT * FROM acl_perm_key_permissions('$user_id') where perm_key='$params[0]'");
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return $row;
    }


    public function getPerm_Key_View($user_id, $url)
    {
        $sql = "SELECT count(*) total FROM acl_perm_key_permissions('$user_id') where perm_key='$url' and v=1";
        $this->db->setSQL($sql);
        $row = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return ($row['TOTAL'] == 0 ? '' : 1);
    }
}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());