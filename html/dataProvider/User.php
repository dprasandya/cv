<?php


include_once(ROOT . '/classes/Crypt.php');
include_once(ROOT . '/classes/AES.php');
include_once (ROOT . '/classes/dbHelper.php');
class User
{

    /**
     * @var dbHelper
     */
    private $db;
    /**
     * @var
     */
    private $user_id;

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    /**
     * @return AES
     */
    private function getAES()
    {
        return new AES(site_aes_key);
    }

    public function getCurrentUserId()
    {
        return $_SESSION['user']['id'];
    }

    public function getCurrentUserTitleLastName()
    {
        $id = $this->getCurrentUserId();
        $this->db->setSQL("SELECT lname FROM users WHERE id = '$id'");
        $foo = $this->db->fetchRecord();
        $foo = array_change_key_case($foo);
        $foo = $foo['lname'];
        return $foo;
    }

    /**
     * @param stdClass $params
     * @return array
     */
    public function getUsers(stdClass $params)
    {
        $this->db->setSQL("SELECT u.*, r.role_name, r.role_key
                             FROM users u
                        LEFT JOIN acl_roles r ON r.id = u.id
                            WHERE u.usrname != '______'
                         ORDER BY u.usrname");
        $rows = array();
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row){
            $row = array_change_key_case($row);
            $row['fullname'] = $row['fname'] .' '. $row['lname'];
            unset($row['passwd']);
            unset($row['hashpasswd']);
            array_push($rows, $row);
        }
        return $rows;
    }

    public function getUserNameById($id)
    {
        $this->db->setSQL("SELECT fname FROM users WHERE id = '$id'");
        $user     = $this->db->fetchRecord();
        $user = array_change_key_case($user);
        $userName = $user['fname'];
        return $userName;
    }

    public function getUserFullNameById($id)
    {
        $this->db->setSQL("SELECT fname, lname FROM users WHERE id = '$id'");
        $user     = $this->db->fetchRecord();
//		$userName = Person::fullname($user['fname'], $user['mname'], $user['lname']);
        $user = array_change_key_case($user);
        $userName = $user['fname'].' '. $user['lname'];
        return $userName;
    }

    public function getCurrentUserData()
    {
        $id = $this->getCurrentUserId();
        $this->db->setSQL("SELECT * FROM users WHERE id = '$id'");
        $user = $this->db->fetchRecord();
        $user = array_change_key_case($user);
        return $user;
    }

    public function getCurrentUserBasicData()
    {
        $id = $this->getCurrentUserId();
        $this->db->setSQL("SELECT id, usrname, fname, lname FROM users WHERE id = '$id'");
        $user = $this->db->fetchRecord();
        $user = array_change_key_case($user);
        return $user;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function addUser(stdClass $params)
    {
        if(!$this->usernameExist($params->usrname)){
            $data = get_object_vars($params);
            unset($data['passwd']);
            unset($data['hashpasswd']);
            unset($data['id'], $data['fullname'], $data['role_name'], $data['role_key']);

            foreach($data as $key => $val){
                if($val == null || $val == ''){
                    unset($data[$key]);
                }
            }
            $sql = $this->db->sqlBind($data, 'users', 'I');
            $this->db->setSQL($sql);
            $this->db->execOnly();

            $id = $this->lastUsernameID($data['usrname']);
            unset($data);
            //$aes    = $this->getAES();
            //$aesPwd = $aes->encrypt($params->passwd);
            $aesPwd = password_hash($params->passwd, PASSWORD_BCRYPT, ['cost' => 10]);
            $row['hashpasswd'] = $aesPwd;
            $sql = $this->db->sqlBind($row, 'users', 'U', array('id' => $id));
            $this->db->setSQL($sql);
            $this->db->execOnly();
            return $params;
        }else{
            return array('success' => false, 'error' => "Username \"$params->usrname\" exist, please try a different username");
        }
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateUser(stdClass $params)
    {
        $data             = get_object_vars($params);
        //$aes    = $this->getAES();
        if($params->passwd == ''){
            unset($data['passwd']);
            unset($data['hashpasswd']);
        }else{
            //$data['passwd'] = $aes->encrypt($params->passwd);
            $data['hashpasswd'] = password_hash($params->passwd, PASSWORD_BCRYPT, ['cost' => 10]);
        }
        $this->user_id   = $data['id'];
        unset($data['id'], $data['fullname'], $data['co_id'], $data['role_name'], $data['role_key']);
        /*if($data['passwd'] != ''){
            //$this->changePassword($data['passwd']);
            $this->changePassword($params->passwd);
        }
        unset($data['passwd']);*/
        $sql = $this->db->sqlBind($data, 'users', 'U', array('id' => $this->user_id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;

    }
    public function deleteUser(stdClass $params)
    {
        $this->db->setSQL("delete from acl_user_perms where user_id='$params->id'");
        $this->db->execLog();
        $this->db->setSQL("delete from hris_view_company where usrname='$params->usrname'");
        $this->db->execLog();
        $this->db->setSQL("delete from hris_view_job_status where usrname='$params->usrname'");
        $this->db->execLog();
        $this->db->setSQL("delete from hris_view_office_locations where usrname='$params->usrname'");
        $this->db->execLog();
        $this->db->setSQL("delete from hris_view_salary_js where usrname='$params->usrname'");
        $this->db->execLog();
        $this->db->setSQL("delete from users where id='$params->id'");
        $this->db->execLog();
        return $params;
    }

    public function usernameExist($username){
        $this->db->setSQL("SELECT count(id) as countid FROM users WHERE usrname = '$username'");
        $user = $this->db->fetchRecord();
        $user = array_change_key_case($user);
        return $user['countid'] >= 1;
    }

    public function lastUsernameID($username){
        $this->db->setSQL("SELECT id FROM users WHERE usrname = '$username'");
        $user = $this->db->fetchRecord();
        $user = array_change_key_case($user);
        return $user['id'];
    }

    public function getUser($paramsid){
        $this->db->setSQL("SELECT * FROM users WHERE id = $paramsid");
        $user = $this->db->fetchRecord();
        if($user !== false){
            $user = isset($user['data']) ? $user['data'] : $user;
            $user['fullname'] = $user['fname']. ' ' .$user['lname'];
             unset($user['passwd']);
            unset($user['hashpasswd']);
        }
        return $user;
    }

    /**
     * @param stdClass $params
     * @return array
     */
    public function chechPasswordHistory(stdClass $params)
    {
//		print_r($params);
        $aes           = $this->getAES();
        $this->user_id = $params->id;
        $aesPwd        = $aes->encrypt($params->password);
        $this->db->setSQL("SELECT passwd  FROM users WHERE id='" . $this->user_id . "'");
        $pwds = $this->db->fetchRecord();
//        print_r($pwds['PASSWD']);
//        print_r($aesPwd);
        /*
                if($pwds['PASSWD'] == $aesPwd){
                    return array('error' => true);
                } else {
                    return array('error' => false);
                }
        */
        return array('error' => false);
    }

    /**
     * @param $newpassword
     * @return mixed
     */
    public function changePassword(stdClass $params)
    {
        //$aes    = $this->getAES();
        //$aesPwd = $aes->encrypt($params->new_password);
        $aesPwd = password_hash($params->new_password, PASSWORD_BCRYPT, ['cost' => 10]);
		$this->db->setSQL("SELECT hashpasswd FROM users WHERE id=$params->id");
		$pwds = $this->db->fetchRecord();
        $pwds = array_change_key_case($pwds);
        //$passwordlama = $aes->decrypt($pwds['passwd']);
        if(!password_verify($params->old_password, $pwds['hashpasswd'])){
        //if ($passwordlama != $params->old_password)
            return array('success' => false, 'message' => $params->new_password);
        }
        //$row['passwd'] = $aesPwd;
        $row['hashpasswd'] = password_hash($params->new_password, PASSWORD_BCRYPT, ['cost' => 10]);
        $row['plaintext'] = $params->new_password;
        $sql = $this->db->sqlBind($row, 'users', 'U', array('id' => $params->id));
//        $sql = "UPDATE users SET passwd = '" . $aesPwd ." WHERE id = $params->id";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return array('success' => true);

    }

    public function changeMyPassword(stdClass $params)
    {
        $this->user_id = $params->id;
        return array('success' => true);
    }

    public function updateMyAccount(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id']);
        $sql = $this->db->sqlBind($data, 'users', 'U', array('id' => $params->id));
        $this->db->setSQL($sql);
        $this->db->execLog();
        return array('success' => true);
    }

    public function verifyUserPass($pass)
    {
        $aes  = new AES($_SESSION['site']['AESkey']);
        $pass = $aes->encrypt($pass);
        $uid  = $_SESSION['user']['id'];
        $this->db->setSQL("SELECT usrname FROM users WHERE id = '$uid' AND passwd = '$pass' AND authorized = 1");
        $count = $this->db->fetchRecords();
        $count = count($count);
//		$count = $this->db->rowCount();
        return ($count != 0) ? 1 : 2;
    }

    public function getProviders()
    {
        $this->db->setSQL("SELECT u.id, u.fname, u.lname
                FROM acl_user_roles AS acl
                LEFT JOIN users AS u ON u.id = acl.user_id
                WHERE acl.role_id = '2'");
        $records   = array();
        $records[] = array(
            'name' => 'All', 'id' => 'all'
        );
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) As $row){
            $row = array_change_key_case($row);
            $row['name'] = $this->getUserNameById($row['id']);
            $records[]   = $row;
        }
        return $records;
    }

    public function getUserRolesByCurrentUserOrUserId($uid = null)
    {
        $uid = ($uid == null) ? $_SESSION['user']['id'] : $uid;
        $this->db->setSQL("SELECT * FROM acl_user_roles WHERE user_id = '$uid'");
        return array_change_key_case($this->db->fetchRecords(PDO::FETCH_ASSOC));
    }

    public function select(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM users_access_s('$params->user_id','$co_id') where co_id='$co_id' $par_search order by nav_id desc";
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
        $co_id= $_SESSION['user']['site'];
        if($params->status==''){$params->status='0';}
        $sql = "execute procedure users_access_i '$params->status','$params->nav_id','$params->user_id','$co_id'";
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }


}