<?php

require_once('http://tomcat:8080/JavaBridge/java/Java.inc');

// Tentukan variabel dari session
$dbhost = 'firebird';
$dbport = '3050';
$dbname = '/firebird/data/lsu.fdb';
$dbuser = 'SYSDBA';
$dbpass = 'masterkey';

// Format URL murni TANPA tanda tanya (?)
$url = "jdbc:firebirdsql://$dbhost:$dbport/$dbname";

echo "Mencoba koneksi ke: <code>$url</code><br/>";

try {
    // Panggil Driver
    java('java.lang.Class')->forName('org.firebirdsql.jdbc.FBDriver');

    // Buat objek Properties Java
    $props = new Java("java.util.Properties");
    $props->setProperty("user", $dbuser);
    $props->setProperty("password", $dbpass);
    $props->setProperty("defaultResultSetHoldable", "True");

    // Lakukan koneksi menggunakan URL dan objek Properties
    $conn = java('java.sql.DriverManager')->getConnection($url, $props);

    echo "<span style='color:green;'><b>Koneksi JDBC via JavaBridge Berhasil!</b></span><br/>";
    
    $reportfile = '/var/www/html/modules/reportcenter/report/master_report/account_master_report.jrxml';
    echo "Mencoba menjalankan laporan dengan file: <code>$reportfile</code><br/>";
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
    $report = $jaspercompiledreport->loadObject($reportfile);
    # Use the fill manager to produce the report.
    $fm = java('net.sf.jasperreports.engine.JasperFillManager');
    $pm = $fm->fillReport($report, $javaParams, $conn);

    $filename = 'gombal.pdf';
    try {
        $exporter = java("net.sf.jasperreports.engine.export.JRPdfExporter");
        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $pm);
        $exporter->setParameter(java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME,
            '/var/www/html/' .$filename);

    } catch (JavaException $ex) {
        echo $ex;
    }

    header("Content-type: application/pdf");
    header("Content-Disposition: attachment; filename=$this->filename");
    $exporter->exportReport();
    $conn->close();



} catch (JavaException $e) {
    // INI AKAN MENAMPILKAN PENYEBAB ASLI JIKA GAGAL
    echo "<span style='color:red;'><b>Gagal Terhubung (Error dari Java Tomcat):</b></span><br/>";
    echo "Pesan: " . $e->getCause() . "<br/>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
} catch (Exception $e) {
    echo "Error PHP: " . $e->getMessage();
}
?>