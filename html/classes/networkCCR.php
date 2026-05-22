<?php

include_once('../lib/Matcha/Matcha.php');

class networkCCR
{

    private static $__hostURL;
    private static $__xmlData;

    /**
     * @param $host
     */
    static public function setHost($host)
    {
        self::$__hostURL = $host;
    }

    /**
     * @param $data
     */
    static public function setXMLData($data)
    {
        self::$__xmlData = $data;
    }

    /**
     * @param $file
     * @return bool
     */
    static public function loadXMLData($file)
    {
        try
        {
            self::setXMLData(file_get_contents($file));
            return true;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * @return bool
     */
    static public function transmitCCR()
    {
        try
        {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, self::$__hostURL);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_TIMEOUT, 4);
            curl_setopt($ch, CURLOPT_POSTFIELDS, self::$__xmlData);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: close'));
            curl_exec($ch);
            return true;
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

    /**
     * @return bool|mixed
     */
    static public function receiveCCR()
    {
        try
        {
            return file_get_contents('php://input');
        }
        catch(Exception $e)
        {
            MatchaErrorHandler::__errorProcess($e);
            return false;
        }
    }

}