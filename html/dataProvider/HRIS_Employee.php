<?php

include_once (ROOT . '/classes/dbHelper.php');
include_once (ROOT . '/dataProvider/Roles.php');

class HRIS_Employee
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
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.employee.Employee')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT first 500 * FROM (select a.*, a.emp_id as doc_id, coalesce(a.emp_first_name,'')||iif(coalesce(a.emp_midle_name,'')='','',' '||a.emp_midle_name)||iif(coalesce(a.emp_last_name,'')='','',' '||a.emp_last_name) as emp_name, a.status as active, b.st_name as emp_st_name, c.dept_name as emp_dept_name, d.js_name as emp_js_name, e.job_desc as emp_job_desc, f.ol_name as emp_ol_name, j.directorate_name as emp_directorate_name, k.afdeling_name  from hris_employee a
left join hris_salary_type b on a.co_id=b.co_id and a.emp_st_id=b.st_id
left join hris_department c on a.co_id=c.co_id and a.emp_dept_id=c.dept_id
left join hris_job_status d on a.co_id=d.co_id and a.emp_js_id=d.js_id
left join hris_job_title e on a.co_id=e.co_id and a.emp_job_id=e.job_id
left join hris_office_locations f on a.co_id=f.co_id and a.emp_ol_id=f.ol_id
inner join hris_view_company g on a.co_id=g.co_id and coalesce(a.emp_company_id,'')=g.company_id and g.usrname='$user_usrname' and coalesce(g.status,'0')='1'
inner join hris_view_job_status h on a.co_id=h.co_id and coalesce(a.emp_js_id,'')=h.js_id and h.usrname='$user_usrname' and coalesce(h.status,'0')='1'
inner join hris_view_office_locations i on a.co_id=i.co_id and coalesce(a.emp_ol_id,'')=i.ol_id and i.status='1' and i.usrname='$user_usrname'
left join hris_directorate j on a.co_id=j.co_id and a.emp_directorate_id=j.directorate_id
left join afdeling k on a.co_id=k.co_id and a.afdeling_id=k.afdeling_id
) where co_id='$co_id' $par_search order by timeedit desc";
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
    public function select_group(stdClass $params)
    {
        if($params->field_search<>''){
            $par_search = "and upper(".$params->field_name.")like upper('%".$params->field_search."%')";
        }
        $user_id = $_SESSION['user']['id']; $user_usrname = $_SESSION['user']['usrname'];
        if($this->url->getPerm_Key_View($user_id,'App.view.hris.employee.Employee_Group')<>1){
            $view_data = "and userinput ='$user_usrname'";
        }
        $co_id = $_SESSION['user']['site'];
        $sql = "SELECT * FROM (select a.*, a.emp_id as doc_id, coalesce(a.emp_first_name,'')||iif(coalesce(a.emp_midle_name,'')='','',' '||a.emp_midle_name)||iif(coalesce(a.emp_last_name,'')='','',' '||a.emp_last_name) as emp_name, a.status as active, b.st_name as emp_st_name, c.dept_name as emp_dept_name, d.js_name as emp_js_name, e.job_desc as emp_job_desc, f.ol_name as emp_ol_name, j.directorate_name as emp_directorate_name  from hris_employee a
left join hris_salary_type b on a.co_id=b.co_id and a.emp_st_id=b.st_id
left join hris_department c on a.co_id=c.co_id and a.emp_dept_id=c.dept_id
left join hris_job_status d on a.co_id=d.co_id and a.emp_js_id=d.js_id
left join hris_job_title e on a.co_id=e.co_id and a.emp_job_id=e.job_id
left join hris_office_locations f on a.co_id=f.co_id and a.emp_ol_id=f.ol_id
inner join hris_view_company g on a.co_id=g.co_id and a.emp_company_id=g.company_id and g.usrname='$user_usrname' and coalesce(g.status,'0')='1'
inner join hris_view_job_status h on a.co_id=h.co_id and a.emp_js_id=h.js_id and h.usrname='$user_usrname' and coalesce(h.status,'0')='1'
left join hris_directorate j on a.co_id=j.co_id and a.emp_directorate_id=j.directorate_id
) where co_id='$co_id' $view_data $par_search order by timeedit desc";
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
        $user_usrname = $_SESSION['user']['usrname'];
        $co_id = $_SESSION['user']['site'];
        $idArray = $params->emp_job_id;
        $array = [];
        for($i = 0 ; $i < count($idArray) ; $i++){
            array_push($array, "'".$idArray[$i]."'");
        }
        if($idArray<>''){
            $emp_job_id =" and emp_job_id IN(".implode(',',$array).")";
        };
        if($params->emp_ol_id<>''){
            $par_ol_id = "and emp_ol_id='$params->ol_id'";
        }
        $sql = "SELECT * FROM hris_employee_p('$user_usrname','$co_id') where co_id='$co_id' $par_ol_id $emp_job_id  $par_search order by emp_id asc";
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
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['emp_join_date']= $this->db->Date_Converter($params->emp_join_date);
        $data['emp_birth_date'] = $this->db->Date_Converter($params->emp_birth_date);
        $data['emp_first_date']= $this->db->Date_Converter($params->emp_first_date);
        $data['emp_end_date'] = $this->db->Date_Converter($params->emp_end_date);
        if($params->pks_afdeling=='PKS'){
            $data['afdeling_id']=null;
        }else{
            $data['pks_type']=null;
        }
        unset($data['id'],$data['active'],$data['doc_id'],$data['path_image'],$data['emp_st_name'],$data['emp_dept_name'],$data['emp_js_name'],$data['emp_job_desc'],$data['emp_name'],$data['emp_ol_name'],$data['emp_directorate_name'],$data['afdeling_name']); $data['co_id']= $_SESSION['user']['site']; $data['userinput'] = $_SESSION['user']['usrname']; $data['timeinput'] = Time::getLocalTime('Y-m-d H:i:s') ;
        $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        //$data['emp_company_id'] = $_SESSION['user']['site'];
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                unset($data[$key]);
            }
        }
        $sql = $this->db->sqlBind($data, 'hris_employee', 'I');
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;

    }
    public function update(stdClass $params)
    {
        $data = get_object_vars($params); if($params->active==''){$data['status']='0';}else{$data['status']='1';}
        $data['emp_join_date']= $this->db->Date_Converter($params->emp_join_date);
        $data['emp_birth_date'] = $this->db->Date_Converter($params->emp_birth_date);
        $data['emp_first_date']= $this->db->Date_Converter($params->emp_first_date);
        $data['emp_end_date'] = $this->db->Date_Converter($params->emp_end_date);
        if($params->pks_afdeling=='PKS'){
            $data['afdeling_id']=null;
        }else{
            $data['pks_type']=null;
        }
        unset($data['id'],$data['active'],$data['doc_id'],$data['path_image'],$data['emp_st_name'],$data['emp_dept_name'],$data['emp_js_name'],$data['emp_job_desc'],$data['emp_name'],$data['emp_ol_name'],$data['emp_directorate_name'],$data['afdeling_name']); $data['co_id']= $_SESSION['user']['site']; $data['useredit'] = $_SESSION['user']['usrname']; $data['timeedit'] = Time::getLocalTime('Y-m-d H:i:s') ;
        //$data['emp_company_id'] = $_SESSION['user']['site'];
        foreach($data as $key => $val){
            if($val == null || $val == ''){
                $data[$key]=null;
                //unset($data[$key]);
            }
        }

        $sql = $this->db->sqlBind($data, 'hris_employee', 'U', array('co_id'=>$params->co_id,'emp_id' => $params->emp_id));

        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }
    public function delete(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $this->db->setSQL("execute procedure hris_employee_d('$params->emp_id','$co_id')");
        $this->db->execLog();
        return $params;
    }


    public function image_upload(stdClass $params){
        $allowedExts = array("gif", "jpeg", "jpg", "png");
        $temp = explode(".", $_FILES["image-upload"]["name"]);

        $extension = end($temp);
        if ((($_FILES["image-upload"]["type"] == "image/gif")
                || ($_FILES["image-upload"]["type"] == "image/jpeg")
                || ($_FILES["image-upload"]["type"] == "image/jpg")
                || ($_FILES["image-upload"]["type"] == "image/pjpeg")
                || ($_FILES["image-upload"]["type"] == "image/x-png")
                || ($_FILES["image-upload"]["type"] == "image/png"))
            && ($_FILES["image-upload"]["size"] < 20000)
            && in_array($extension, $allowedExts))
        {
            if ($_FILES["image-upload"]["error"] > 0)
            {
                print_r( "Return Code: " . $_FILES["image-upload"]["error"] . "<br>");
            }
            else
            {
                echo "Upload: " . $_FILES["image-upload"]["name"] . "<br>";
                echo "Type: " . $_FILES["image-upload"]["type"] . "<br>";
                echo "Size: " . ($_FILES["image-upload"]["size"] / 1024) . " kB<br>";
                echo "Temp file: " . $_FILES["image-upload"]["tmp_name"] . "<br>";

                if (file_exists("../upload/" . $_FILES["image-upload"]["name"]))
                {
                    print_r( $_FILES["image-upload"]["name"] . " already exists. ");
                }
                else
                {
                    copy($_FILES["image-upload"]["tmp_name"],
                        "../upload/" . $_FILES["image-upload"]["name"]);
                    echo "Stored in: " . "/upload/" . $_FILES["image-upload"]["name"];
                }
            }
        }
        else
        {
            echo "Invalid file";
        }
    }
    public function upload_to_machine(stdClass $params){
        $co_id = $_SESSION['user']['site'];
        $sql =("execute procedure hris_employee_upload_to_machine('$params->emp_ol_id','$params->emp_last_name','$params->emp_midle_name','$params->emp_first_name','$params->emp_id','$co_id')");
        $this->db->setSQL($sql);
        $this->db->execLog();
        return $params;
    }

}

//
//$r = new Roles();
//print '<pre>';
//print_r($r->getRoleGrid());