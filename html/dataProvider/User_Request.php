<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');
include_once ($_SESSION['root'] . '/classes/class.phpmailer.php');

class User_Request
{

    /**
     * @var dbHelper
     */
    private $db, $tg_params, $website, $waurl,
            $botToken='1360767400:AAHdpJ8B88Rb1L3urpcbKNPErIDQefSdrLw',
            $chatId=-446775333;
    
    /**
     * @var
     */

    function __construct()
    {
        $this->db = new dbHelper();
        $this->website = "https://api.telegram.org/bot".$this->botToken;
        $this->waurl = "http://172.16.0.7:8088/chats/send?id=dharma-simpati";
        return;
    }
    public function select(stdClass $params)
    {
        if($params->search2<>''){
            $search = "and upper(".$params->search1.") like upper('%". $params->search2."%')";
        }
        $company =  $_SESSION['user']['site'];
        $user_id = $_SESSION['user']['usrname'];
        $sql = "select * from (
        select a.co_id, a.seq_id, a.user_id, a.permasalahan, a.penyelesaian, a.user_done, a.status, a.userinput, a.useredit, a.timeinput, a.timeedit from user_request a
        left join users b on a.co_id=b.co_id and a.user_id=b.usrname
) where co_id='$company' $search ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $rows[] = $row;
        }
        $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array(
            'totals' => $total,
            'rows' => $rows
        );
    }
    public function dashboard(stdClass $params)
    {
        if($params->search2<>''){
            $search = "and upper(".$params->search1.") like upper('%". $params->search2."%')";
        }
        $company =  $_SESSION['user']['site'];
        $user_id = $_SESSION['user']['usrname'];
        $sql = "select * from (
        select a.co_id, a.sequence_no, a.user_id, a.permasalahan, a.penyelesaian, iif('$user_id'='admin', 0, iif(a.status in('PROGRESS','DONE','CANCEL'), 1, 0)) as status, b.usrname as user_name, a.status as status_request, a.userinput, a.useredit, a.timeinput, a.timeedit from user_request a
        left join users b on a.co_id=b.co_id and a.user_id=b.usrname
        where a.status='REQUEST' 
) where co_id='$company' $search ORDER BY timeedit DESC";
        $this -> db -> setSQL($sql);
        foreach ($this->db->fetchRecords(PDO::FETCH_ASSOC) as $row)
        {
            $row = array_change_key_case($row);
            $rows[] = $row;
        }
        $total = count($rows);
        $rows = array_slice($rows, $params->start, $params->limit);
        return array(
            'totals' => $total,
            'rows' => $rows
        );
    }
    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function add(stdClass $params)
    {
        $data = get_object_vars($params);
        unset($data['id'], $data['user_name']);
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $data['co_id'] = $_SESSION['user']['site'];
        $data['userinput'] = $_SESSION['user']['usrname'];
        $data['useredit'] = $_SESSION['user']['usrname'];
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['user_id']  = $_SESSION['user']['usrname'];
        //$data['status']  = $params->status;
        $sql = $this->db->sqlBind($data, 'user_request', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();

        if($params->status=='REQUEST'){
//            $mail = new PHPMailer;
//            $mail->IsSMTP();
//            $mail->SMTPSecure = 'tls';
//            $mail->Host = "smtp.gmail.com"; //host masing2 provider email
//            $mail->SMTPDebug = 0;
//            $mail->Port = 587;
//            $mail->SMTPAuth = true;
//            $mail->Username = "infosaraswanti@gmail.com"; //user email
  //          $mail->Password = "Untusoft1"; //password email
    //        $mail->SetFrom("infosaraswanti@gmail.com", $_SESSION['user']['username']); //set email pengirim
//            $mail->Subject = "User Request : ".$_SESSION['user']['username']; //subyek email
//            $mail->AddAddress("it@saraswanti.com","IT Support");  //tujuan email
//            $mail->MsgHTML($_SESSION['url']." - ".$_SESSION['user']['site']."<br><br>"."Message :". "<br><br>" . $params->permasalahan);

            /* Mulai Script Kirim lewat Telegram SendMessage */
            $tg_params=[
                'chat_id'=>$this->chatId,
                'text'=> "[ADD - REQUEST] \r\n". 
                "Site: " . $_SESSION['user']['site'] . "\r\n" .
                "From URL: " . $_SESSION['site_url'] . "\r\n" . 
                "User Request: " . $_SESSION['user']['usrname'] . "\r\n" . 
                "Message : ". $params->permasalahan
            ];
            $ch = curl_init($this->website . '/sendMessage');
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ($tg_params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            curl_close($ch);
            /* Akhir Script Kirim lewat Telegram SendMessage */
            
//            if($mail->Send()) return $params;
//            else echo "Failed to sending message";

        }else if($params->status=='DONE'){
//            $mail = new PHPMailer;
//            $mail->IsSMTP();
//            $mail->SMTPSecure = 'tls';
//            $mail->Host = "smtp.gmail.com"; //host masing2 provider email
//            $mail->SMTPDebug = 0;
//            $mail->Port = 587;
//            $mail->SMTPAuth = true;
//            $mail->Username = "infosaraswanti@gmail.com"; //user email
//            $mail->Password = "Untusoft1"; //password email
//            $mail->SetFrom("infosaraswanti@gmail.com", $_SESSION['user']['username']); //set email pengirim
//            $mail->Subject = "User Request : ".$_SESSION['user']['username']; //subyek email
//            $mail->AddAddress("it@saraswanti.com","IT Support");  //tujuan email
//            $mail->MsgHTML($_SESSION['url']." - ".$_SESSION['user']['site']."<br><br>"."Message : Sudah Dikerjakan". "<br><br>" . $params->permasalahan . "<br><br>" .$params->penyelesaian);
//            if($mail->Send()) return $params;
//            else echo "Failed to sending message";


        }
        else{

            /* Mulai Script Kirim lewat Telegram SendMessage */
            $tg_params=[
                'chat_id'=>$this->chatId,
                'text'=> "[ADD - REQUEST] \r\n". 
                "Site: " . $_SESSION['user']['site'] . "\r\n" .
                "From URL: " . $_SESSION['site_url'] . "\r\n" . 
                "User Request: " . $_SESSION['user']['usrname'] . "\r\n" . 
                "Message : ". $params->permasalahan
            ];
            $ch = curl_init($this->website . '/sendMessage');
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ($tg_params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            curl_close($ch);
            /* Akhir Script Kirim lewat Telegram SendMessage */

            return $params;
        }

        /*if($params->status_request=='REQUEST'){
            $to = "keluarga.cookies@gmail.com"; // this is your Email address
            $from = "alkis@saraswanti.com"; // this is the sender's Email address
            $first_name = $_SESSION['user']['username'];
            $subject = "User Request ". $_SESSION['user']['site'];
            $message = $first_name . " wrote the following:" . "\n\n" . $params->permasalahan;
            $headers = "From:" . $from;
            mail($to,$subject,$message,$headers);
            echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
        }*/


    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function update(stdClass $params)
    {
        $data       = get_object_vars($params);
        $old_status = $data['status'];
        $user_name = $data['user_name'];
        unset($data['id'], $data['user_id'], $data['user_name']);
        $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s');
        $data['useredit'] = $_SESSION['user']['usrname'];
        //$data['status']  = $params->status_request;
        $sql = $this->db->sqlBind($data, 'user_request', 'U', array('co_id' => $params->co_id,'seq_id' => $params->seq_id));
        $this->db->setSQL($sql);
        $this->db->execLog();

        if( ($params->status == 'DONE') || ($params->status == 'CANCEL')){

            /* Mulai Script Kirim lewat Telegram SendMessage */
            $tg_params=[
                'chat_id'=>$this->chatId,                
                'text'=> "[UPDATE - ".$params->status."] \r\n" .
                "Site: " . $_SESSION['user']['site'] . "\r\n" .
                "From URL: " . 'site_url' . "\r\n" . 
                "User Request: " . $params->user_id . "\r\n" . 
                "Message: ". $params->permasalahan . "\r\n" .
                "Penyelesaian: ". $params->penyelesaian . "\r\n" .
                "Oleh: ". $params->user_done
            ];
            $ch = curl_init($this->website . '/sendMessage');
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ($tg_params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            curl_close($ch);
            
            /*$sql = "select no_wa from users where usrname = '".$user_name."'";
            $this -> db -> setSQL($sql);
            $row = $this->db->fetchRecord();
            $rows = array_change_key_case($row);
            $no_wa = $rows['no_wa'];
            if ($no_wa !== '') {
                $msg = "[UPDATE - ".$params->status."] \r\n".                
                "Site: " . $_SESSION['user']['site'] . "\r\n" .
                "From URL: " . $_SESSION['url'] . "\r\n" . 
                "User Request: " . $user_name . "\r\n" . 
                "Message: ". $params->permasalahan . "\r\n" .
                "Penyelesaian: ". $params->penyelesaian . "\r\n" .
                "Oleh: ". $params->user_done . "\r\n";
                $body = array('text' => $msg);
                $postfield = json_encode(array('receiver' => $no_wa, 'message' => $body));
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_URL => $this->waurl,                    
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => $postfield, 
                    CURLOPT_HTTPHEADER => array(
                        'Content-Type: application/json'
                    ),
                ));
                $response = curl_exec($curl);

                curl_close($curl);
            }*/

        } else if( $params->status == $old_status ) { 

            /* Mulai Script Kirim lewat Telegram SendMessage */
            $tg_params=[
                'chat_id'=>$this->chatId,
                'text'=> "[CHANGE - REQUEST] \r\n" .
                "Site: " . $_SESSION['user']['site'] . "\r\n" .
                "From URL: " . $_SESSION['url'] . "\r\n" . 
                "User Request: " . $params->user_id . "\r\n" . 
                "Message : ". $params->permasalahan
            ];
            $ch = curl_init($this->website . '/sendMessage');
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ($tg_params));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $result = curl_exec($ch);
            curl_close($ch);
            /* Akhir Script Kirim lewat Telegram SendMessage */
        }

        return $params;
    }

    public function delete(stdClass $params)
    {
        $sql = "DELETE FROM user_request WHERE (co_id = '$params->co_id') and (seq_id = '$params->seq_id')";
        $this -> db -> setSQL($sql);
        $this -> db -> execLog();
        return $params;
    }

}