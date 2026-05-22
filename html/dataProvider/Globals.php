<?php

include_once(ROOT . '/classes/dbHelper.php');

class Globals extends dbHelper
{

    /**
     * @var bool|MatchaCUP
     */
    private static $g = null;
    private $db;

    public static function getGlobals()
    {
        $db = new dbHelper();
        $sql = "SELECT * FROM globals order by gl_category asc";
        $db -> setSQL($sql);
        $rows = array();
        foreach ($db -> fetchRecords(PDO::FETCH_ASSOC) as $row) {
            $row = array_change_key_case($row);
            array_push($rows, $row);
        }
        return $rows;
    }

    /**
     * @param stdClass $params
     * @return stdClass
     */
    public function updateGlobals(stdClass $params)
    {
        $sql = "UPDATE globals SET gl_value =iif(coalesce('$params->gl_value','')='', null, '$params->gl_value')  where gl_index='$params->gl_index' and gl_name='$params->gl_name' ";
        $this -> setSQL($sql);
        $this -> execLog();
        return $params;

        /*$data = get_object_vars($params);

        foreach ($data as $key => $value)
        {
            if (is_int($value))
            {
                $rec = trim($value);
            }
            else
            {
                $rec = $value;
            }
            $sqlcount = "SELECT COUNT(*) as countrec FROM globals WHERE gl_name = '" . $key . "'";
            $this -> setSQL($sqlcount);
            $r = $this->fetchRecord(PDO::FETCH_ASSOC);
            if ($r['COUNTREC'] > 0)
            {
                $sql = "UPDATE globals SET gl_value = '". $rec . "' WHERE gl_name = '" . $key . "'";
                $this -> setSQL($sql);
            }
            else {
                $sql = "INSERT INTO globals (gl_name, gl_index, gl_value) VALUES ('". $key . "', 0, '" . $value . "')";
                $this -> setSQL($sql);
            }
            $this -> execLog();
        }
        $this -> setGlobals();

        return $params;*/

    }

    /**
     * @static
     * @return mixed
     */
    public static function setGlobals()
    {
        $db = new dbHelper();

        if(!isset($_SESSION['globals'])) $_SESSION['globals'] = array();
        $db -> setSQL("SELECT gl_name, gl_value FROM globals");
        foreach ($db->fetchRecords(PDO::FETCH_ASSOC) as $setting)
        {
            $setting = array_change_key_case($setting);
            $_SESSION['globals'][$setting['gl_name']] = $setting['gl_value'];

        }
        $_SESSION['globals']['timezone_offset'] = -14400;
        $_SESSION['globals']['date_time_display_format'] = $_SESSION['globals']['date_display_format'] . ' ' . $_SESSION['globals']['time_display_format'];
        return $_SESSION['globals'];
    }

    /**
     * @return array
     */
    public static function getGlobalsArray() {
        $db = new dbHelper();

        $db -> setSQL("SELECT gl_name, gl_value FROM globals");
        $gs = array();
        foreach ($db->fetchRecords(PDO::FETCH_ASSOC) as $g)
        {
            $g = array_change_key_case($g);
            $gs[$g['gl_name']] = $g['gl_value'];
        }
        return $gs;
    }

    /**
     * @param string $global
     * @return mix
     */
    public static function getGlobal($global) {
        if(!isset($_SESSION['globals'])){
            self::setGlobals();
            return self::getGlobal($global);
        } else {
            return isset($_SESSION['globals'][$global]) ? $_SESSION['globals'][$global] : false;
        }
    }
    public static function getLogoURL()
    {
        $fid = $_SESSION['site']['name'];
        $db = new dbHelper();
        $db -> setSQL("SELECT gl_value FROM globals WHERE gl_name='LOGO'");
        $i = $db -> fetchRecord(PDO::FETCH_ASSOC);
        $i = array_change_key_case($i);
        $getLogoURL = $i['gl_value'];
        return $getLogoURL;
    }

}

//print '<pre>';
//$g = new Globals();
//print_r($g->getGlobals());
