<?php
namespace modules\reportcenter\dataProvider;

use Exception;

//require_once __DIR__ . '/vendor/autoload.php';
//use Jaspersoft\Client\Client;

if(!isset($_SESSION)){
	session_name('SPIApp');
	session_start();
	session_cache_limiter('private');
}
include_once(ROOT . '/classes/FileManager.php');
include_once(ROOT . '/classes/dbHelper.php');
include_once(ROOT . '/dataProvider/Globals.php');
require_once('http://tomcat:8080/JavaBridge/java/Java.inc');

class Reports {
	protected $pdf;
    public $reportfile;
    public $uri;
    public $filename;
    public $lokasirpt;
    public $logourl;
    public $formattype;
    protected $fileManager;

	/*
	 * The first thing all classes do, the construct.
	 */
	function __construct() {

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
        $params = new Java("java.util.HashMap");

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
        $current_timeout = ini_get('max_execution_time');
        set_time_limit(0);

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

            // Format URL murni TANPA tanda tanya (?)
//            $url = "jdbc:firebirdsql://$dbhost:$dbport/$dbname";
            $url = "jdbc:firebirdsql://" . $dbhost . ":" . $dbport . "/" . $dbname;

            // Panggil Driver
            java('java.lang.Class')->forName('org.firebirdsql.jdbc.FBDriver');

            // Buat objek Properties Java
            $props = new Java("java.util.Properties");
            $props->setProperty("user", $dbuser);
            $props->setProperty("password", $dbpass);
//            $props->setProperty("defaultResultSetHoldable", "True");

            // Lakukan koneksi menggunakan URL dan objek Properties
            $conn = java('java.sql.DriverManager')->getConnection($url, $props);

            $jaspercompiledreport = java("net.sf.jasperreports.engine.util.JRLoader");
            $report = $jaspercompiledreport->loadObject($this->reportfile);
            # Use the fill manager to produce the report.
            $fm = java('net.sf.jasperreports.engine.JasperFillManager');
            $pm = $fm->fillReport($report, $params, $conn);

            switch ($this->formattype) {
                case 'XLS':
                    $this->filename = $this -> fileManager -> getTempDirAvailableName() . '.xls';
                    try {
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRXlsExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRCsvExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.ooxml.JRDocxExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRHtmlExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRPdfExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.oasis.JROdsExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.oasis.JROdtExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRTextExporter");
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
                        $exporter = new \java("net.sf.jasperreports.engine.export.JRRtfExporter");
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
        set_time_limit($current_timeout);
        ini_set('max_execution_time', $current_timeout);
        
        return site_temp_url . '/' . $this->filename;

    }
/*
    public function js_report_execute(\stdClass $parameters)
    {

        $current_timeout = ini_get('max_execution_time');
        set_time_limit(0);

        try {
            $c = new Client("http://192.168.168.6:8088/jasperserver","jasperadmin","Saraswanti*818");
            $params = $parameters->params;
            switch ($this->formattype) {
                case 'PDF':
                    $format = 'pdf';
                    break;
                case 'XLS':
                    $format = 'xls';
                    break;
                case 'CSV':
                    $format = 'csv';
                    break;
                case 'DOC':
                    $format = 'docx';
                    break;
                case 'HTML':
                    $format = 'html';
                    break;
                case 'ODS':
                    $format = 'ods';
                    break;
                case 'ODT':
                    $format = 'odt';
                    break;
                case 'TXT':
                    $format = 'txt';
                    break;
                case 'RTF':
                    $format = 'rtf';
                    break;
            }
            $this->filename = $this->fileManager->getTempDirAvailableName() . '.' .$format;
            $report = $c->reportService()->runReport($this->uri, $format, null, null, $params);
            file_put_contents($this->filename, $report);
            switch ($format) {
                case 'pdf':
                    header("Content-type: application/pdf");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'xls':
                    header("Content-type: application/vnd.ms-excel");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'xlsx':
                    header("Content-type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    header("Content-Disposition: attachment; filename=$this->filename");
                case 'csv':
                    header("Content-type: application/csv");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'docx':
                    header("Content-type: application/vnd.ms-word");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'rtf':
                    header("Content-type: application/rtf");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'ods':
                    header("Content-type: application/vnd.oasis.opendocument.spreadsheet");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'odt':
                    header("Content-type: application/vnd.oasis.opendocument.text");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                case 'html':
                    header("Content-type: text/html");
                    header("Content-Disposition: attachment; filename=$this->filename");
                    break;
                }            
        } catch (Exception $err) {
            echo 'Error: ' . $err->getMessage();
        }
        ini_set('max_execution_time', $current_timeout);
        return site_temp_url . '/' . $this->filename;

    }

    /*public function ReportBuilder($html, $fontsize = 12) {
		$fileName = $this->fileManager->getTempDirAvailableName() . '.pdf';
		$this->pdf->SetCreator('TCPDF');
		$this->pdf->SetAuthor($_SESSION['user']['name']);
		$siteLogo = site_dir . '/logo.jpg';
		$logo = (file_exists($siteLogo) ? $siteLogo : ROOT . '/resources/images/logo.jpg');

		// TODO: set from admin area
		$this->pdf->SetHeaderData($logo, '20', 'Ernesto\'s Clinic', "Cond. Capital Center\nPDO Suite 205\nAve. Arterial Hostos 239                                                                                                                                   Tel: 787-787-7878\nCarolina PR. 00987                                                                                                                                         Fax: 787-787-7878");
		//need to be change
		$this->pdf->setHeaderFont(Array(
			'helvetica',
			'',
			10
		));
		$this->pdf->setFooterFont(Array(
			'helvetica',
			'',
			8
		));
		$this->pdf->SetDefaultMonospacedFont('courier');
		$this->pdf->SetMargins(15, 27, 15);
		$this->pdf->SetHeaderMargin(5);
		$this->pdf->SetFooterMargin(10);
		$this->pdf->SetFontSize($fontsize);
		$this->pdf->SetAutoPageBreak(true, 25);
		$this->pdf->setFontSubsetting(true);
		$this->pdf->AddPage();
		$this->pdf->writeHTML($html, true, false, false, false, '');
		$this->pdf->Output($_SESSION['site']['temp']['path'] . '/' . $fileName, 'F');
		$this->pdf->Close();
		return $_SESSION['site']['temp']['url'] . '/' . $fileName;
	}*/

}

//
//$r = new Reports();
//$r->reportfile = ROOT . '/modules/reportcenter/report/marketing_report/order_letter_report.jasper';
//$params = new \stdClass;
//$r->report_execute($params);
