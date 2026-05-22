<?php

include_once (ROOT . '/classes/dbHelper.php');

class HRIS_Pph21_updown_rate
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

    public function update(stdClass $params)
    {
        $co_id= $_SESSION['user']['site'];
        if($params->updown=='U'){
            $sql = "update hris_emp_salary set amount = amount + (amount*(cast($params->updown_rate as num18_2)/100)) where co_id='$co_id' and sc_id ='$params->updown_salary' ";
        }else{
            $sql = "update hris_emp_salary set amount = amount - (amount*(cast($params->updown_rate as num18_2)/100)) where co_id='$co_id' and sc_id ='$params->updown_salary' ";
        }
        $this->db->setSQL($sql);
        $this->db->execLog();
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());