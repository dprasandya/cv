<?php

if(!isset($_SESSION)){
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}
include_once(ROOT . '/classes/Crypt.php');
include_once(ROOT . '/classes/dbHelper.php');
include_once(ROOT . '/dataProvider/User.php');

class Sessions {
	private $s;

    function __construct()
    {
        $this->db = new dbHelper();
        return;
    }

    public function loginSession()
    {
        $date                  = time();
        $data['sid']           = session_id();
        $data['uid']           = $_SESSION['user']['id'];
        $data['login']         = $date;
        $data['last_request	'] = $date;
        $this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'I'));
        $this->db->execLog();
        $this->db->setSQL("select first 1 id from users_sessions where sid = '" . $data['sid'] ."'");
        $r = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        return $_SESSION['session_id'] = $r['ID'];
    }

    public function setSessionByToken($token)
    {
        $s = json_decode(Crypt::decrypt($token));
        $this->db->setSQL("SELECT s.id AS sid, s.uid AS uid, u.lname, u.fname, u.email, u.usrname
							 FROM users_sessions s
						LEFT JOIN users u ON s.uid = u.id
							WHERE s.id = '$s->sid' AND s.logout IS NULL");
        $session = $this->db->fetchRecord(PDO::FETCH_ASSOC);
        if($session === false){
            $User = new User();
            $r = $User->getUser($session['uid']);
            $r = array_change_key_case($r);
            $_SESSION['user']['name']  = $User['fullname'];
            $_SESSION['user']['id']    = $User['id'];
            $_SESSION['user']['usrname']    = $User['usrname'];
            $_SESSION['user']['email'] = $User['email'];
            $_SESSION['user']['site']  = $s->site;
            $_SESSION['user']['auth']  = true;
            unset($User);
            return true;
        }else{
            return false;
        }
    }

    public function updateSession()
    {
        $_SESSION['inactive']['timeout'] = time();
        $data['last_request']        = $_SESSION['inactive']['timeout'];
        $this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'U', array('id' => $_SESSION['session_id'])));
        $this->db->execOnly();
        return true;
    }

    public function logoutSession()
    {
        $data['logout'] = time();
        $this->db->setSQL($this->db->sqlBind($data, 'users_sessions', 'U', array('id' => $_SESSION['session_id'])));
        $this->db->execOnly();
        return true;
    }

    public function logoutInactiveUsers()
    {
        $now   = time();
        $foo   = $now - $_SESSION['inactive']['time'];
        $users = array();
        $this->db->setSQL("SELECT id, uid FROM users_sessions WHERE last_request < $foo AND logout IS NULL");
/*
        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $user){
            $id      = $user['ID'];
            $users[] = array('uid' => $user['UID']);
            $this->db->setSQL("UPDATE users_sessions SET logout = $now WHERE id = $id");
            $this->db->execOnly();
        }
*/

        foreach($this->db->fetchRecords(PDO::FETCH_ASSOC) as $session){
            $session = array_change_key_case($session);
            if(isset($user['id'])){
                $users[] = array('uid' => $session['uid']);
                $data = new stdClass();
                $data->id = $session['id'];
                $data->logout = $now;
                $this->db->setSQL("UPDATE users_sessions SET logout = $now WHERE id = $data->id");
                $this->db->execOnly();
                unset($data);
            }
        }
        return $users;
    }


}
//$s = new Sessions();
//$s->setSessionByToken("uzUc7qJ4YHc6F76WfoRnJwSycND+CLaUVmL2AcdEyHniHzONcq2C70wo7A+oA8aw\/C\/Q8UrRPZ7rrrmNut482w==");
