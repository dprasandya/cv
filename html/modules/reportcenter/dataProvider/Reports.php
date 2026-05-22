<?php
namespace modules\reportcenter\dataProvider;

if(!isset($_SESSION)){
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}

include_once(ROOT . '/classes/FileManager.php');
include_once(ROOT . '/classes/dbHelper.php');
include_once(ROOT . '/dataProvider/Globals.php');
require_once("http://tomcat:8080/JavaBridge/java/Java.inc");


class Reports {
	protected $pdf;

    public $reportfile;
    public $filename;
    public $lokasirpt;
    public $logourl;
    public $formattype;
    protected $fileManager;

	/*
	 * The first thing all classes do, the construct.
	 */
	function __construct() {
		/*$this->fileManager = new \FileManager();
		$this->pdf = new \DocumentPDF('P', 'mm', 'A4', true, 'UTF-8', false);
		return;*/

        $this->fileManager = new \FileManager();
        $this->logourl = \Globals::getLogoURL();
        return;
	}
    
    public function DateConvert($date) {
        if (!is_null($date))
        {
            $date = new \DateTime($date, new \DateTimeZone("Asia/Jakarta"));

            $strdate = $date->format('m/d/Y H:i:s');
            $strdate = explode(" ", $strdate);
            $date = $strdate[0];
        }
        return $date;
    }

    public function convertValue($value, $className)
    {
        try
        {
            if ($className == 'java.lang.String')
            {
                $temp = new Java('java.lang.String', $value);
                return $temp;
            }
            else if ($className == 'java.util.Date')
            {
                $temp = new Java($className, $value);
                return $temp;
            }
            else if ($className == 'java.lang.Boolean' ||
                $className == 'java.lang.Integer' ||
                $className == 'java.lang.Long' ||
                $className == 'java.lang.Short' ||
                $className == 'java.lang.Double' ||
                $className == 'java.math.BigDecimal')
            {
                $temp = new Java($className, $value);
                return $temp;
            }
            else if ($className == 'java.sql.Timestamp' ||
                $className == 'java.sql.Time')
            {
                $temp = new Java($className);
                $javaObject = $temp->valueOf($value);
                return $javaObject;
            }
        }
        catch (Exception $err)
        {
            echo (  'unable to convert value, ' . $value .
                ' could not be converted to ' . $className);
            return false;
        }
    }

    public function report_parse_post_parameters(\stdClass $parameters)
    {
        $data = get_object_vars($parameters->params);
        $params = new Java('java.util.HashMap');

        foreach( $data as $name => $value ) {
            if( strpos( $name, 'report_dir' ) === 0 ) {
                $params->put( 'SUBREPORT_DIR', $this->lokasirpt );
            }
            if ( strpos($name, 'report_date_') === 0) {
                $length = strlen ('report_date_');
                $value = $this->DateConvert( $value );
                $value = $this->convertValue($value, 'java.util.Date');
                $params->put(substr($name,$length), $value);
            }
            else if( strpos( $name, 'report_' ) === 0 ) {
                $length = strlen( 'report_' );
                if( strpos( $name, 'report_int_' ) === 0 ) {
                    $value = intval( $value );
                    $length = strlen( 'report_int_' );
                    $value = $this->convertValue( $value, 'java.lang.Integer' );
                    $params->put( substr( $name, $length ), $value );
                }
                else if( strpos( $name, 'report_arr_' ) === 0 ) {
                    $length = strlen( 'report_arr_' );
                    $arrays = array_filter( explode( ',', $data[ $name ] ) );
                    $arrayList = new Java( 'java.util.ArrayList' );
                    foreach( $arrays as $value ) {
                        $arrayList->add( $value );
                    }
                    $params->put( substr( $name, $length ), $arrayList );
                }
                else {
                    $params->put( substr( $name, $length ), $value );
                }
            }
        }
        return $params;
    }

    public function report_execute(\stdClass $parameters)
    {
        print_r($parameters);
        $data = get_object_vars($parameters->params);
        $conn = null;
        $this->formattype = $data['cb_exporttype']; //$data['cb_exporttype-inputEl'];
        try {
            $params = $this->report_parse_post_parameters($parameters);
            $params->put('LOGOURL', $this->logourl);
            # Load the FirebirdSQL database driver.
            $dbhost = (string)$_SESSION['site']['db']['host'] ;
            $dbport = (int)$_SESSION['site']['db']['port'];
            $dbname = (string)$_SESSION['site']['db']['database'];
            $dbuser = (string)$_SESSION['site']['db']['username'];
            $dbpass = (string)$_SESSION['site']['db']['password'];

            // 2. Buka Koneksi Firebird via JavaBridge
            java('java.lang.Class')->forName('org.firebirdsql.jdbc.FBDriver');
            
            $url = "jdbc:firebirdsql://" . $dbhost . ":" . $dbport . "/" . $dbname;
            
            $props = new Java("java.util.Properties");
            $props->setProperty("user", new Java("java.lang.String", $dbuser));
            $props->setProperty("password", new Java("java.lang.String", $dbpass));
            $props->setProperty("defaultResultSetHoldable", "True");
            
            $conn = java('java.sql.DriverManager')->getConnection($url, $props);
            // 3. Masukkan Parameter Report ke java.util.HashMap
            $javaParams = new Java("java.util.HashMap");
            foreach ($reportParams as $key => $value) {
                // PENTING: Jasper sangat ketat soal tipe data parameter.
                // Di sini kita asumsikan semua parameter bertipe java.lang.String di dalam file .jrxml Anda.
                $jKey   = new Java("java.lang.String", $key);
                $jValue = new Java("java.lang.String", $value);
                $javaParams->put($jKey, $jValue);
            }

            // 4. Proses JasperReports!
            // JasperFillManager mengisi template dengan data dari database Firebird
            $jaspercompiledreport = java("net.sf.jasperreports.engine.util.JRLoader");
            $report = $jaspercompiledreport->loadObject($this->reportfile);
            # Use the fill manager to produce the report.
            $fm = java('net.sf.jasperreports.engine.JasperFillManager');
            $pm = $fm->fillReport($report, $params, $conn);

            switch ($this->formattype) {
                case 'XLS':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.xls';
                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.JRXlsExporter");
//                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_ONE_PAGE_PER_SHEET, java("java.lang.Boolean")->FALSE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_WHITE_PAGE_BACKGROUND, java("java.lang.Boolean")->FALSE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRXlsExporterParameter")->IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, java("java.lang.Boolean")->TRUE);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }
                    header("Content-type: application/vnd.ms-excel");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'CSV':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.csv';
                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.JRCsvExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->FIELD_DELIMITER, ",");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->RECORD_DELIMITER, "\n");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRCsvExporterParameter")->CHARACTER_ENCODING, "UTF-8");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }
                    header("Content-type: application/csv");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'DOC':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.doc';

                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.ooxml.JRDocxExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }
                    header("Content-type: application/vnd.ms-word");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'HTML':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.html';
                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.JRHtmlExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }
                    break;
                case 'PDF':
                    $this->filename = $this->fileManager->getTempDirAvailableName() . '.pdf';
                    try {
                        $exporter = java("net.sf.jasperreports.engine.export.JRPdfExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);

                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/pdf");
                    header("Content-Disposition: attachment; filename=$this->filename");

                    break;
                case 'ODS':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.ods';

                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.oasis.JROdsExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.oasis.opendocument.spreadsheet");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'ODT':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.odt';

                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.oasis.JROdtExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/vnd.oasis.opendocument.text");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'TXT':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.txt';

                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.JRTextExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRTextExporterParameter")->PAGE_WIDTH, 120);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.export.JRTextExporterParameter")->PAGE_HEIGHT, 60);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: text/plain");
                    break;
                case 'RTF':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.rtf';

                    try {
                        $exporter = new Java("net.sf.jasperreports.engine.export.JRRtfExporter");
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
                        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
                            site_temp_path . '/' .$this->filename);
                    } catch (JavaException $ex) {
                        echo $ex;
                    }

                    header("Content-type: application/rtf");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
            }

            $exporter->exportReport();
            $conn->close();
        }
        catch( Exception $ex ) {
            if( $conn != null ) {
                $conn->close();
            }

            throw $ex;
        }

        return site_temp_url . '/' . $this->filename;

    }

}