<?php
// Ganti dengan path Java.inc Anda
require_once("http://tomcat:8080/JavaBridge/java/Java.inc");

function generateJasperPDF($jasperFileName, $outputPdfName, $reportParams, $dbConfig) {
    try {
        // 1. Definisikan Path (Karena pakai Shared Volume)
        // Tomcat melihat folder ini di: /usr/local/tomcat/reports/
        // PHP melihat folder ini di: /var/www/reports/
        $tomcatReportDir = "/usr/local/tomcat/reports/";
        $phpReportDir    = "/var/www/reports/";
        
        $jasperPath = $tomcatReportDir . $jasperFileName;
        $pdfPath    = $tomcatReportDir . $outputPdfName;

        // 2. Buka Koneksi Firebird via JavaBridge
        java('java.lang.Class')->forName('org.firebirdsql.jdbc.FBDriver');
        
        $url = "jdbc:firebirdsql://" . $dbConfig['host'] . ":" . $dbConfig['port'] . "/" . $dbConfig['database'];
        
        $props = new Java("java.util.Properties");
        $props->setProperty("user", new Java("java.lang.String", $dbConfig['username']));
        $props->setProperty("password", new Java("java.lang.String", $dbConfig['password']));
        
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
        $fillManager = java("net.sf.jasperreports.engine.JasperFillManager");
        $jasperPrint = $fillManager->fillReport($jasperPath, $javaParams, $conn);

        // JasperExportManager merender hasilnya menjadi file PDF
        $exportManager = java("net.sf.jasperreports.engine.JasperExportManager");
        $exportManager->exportReportToPdfFile($jasperPrint, $pdfPath);

        // 5. Tutup Koneksi Database
        $conn->close();

        // 6. Cek apakah file PDF berhasil dibuat, lalu tampilkan ke browser
        $phpPdfLocation = $phpReportDir . $outputPdfName;
        
        if (file_exists($phpPdfLocation)) {
            header('Content-Type: application/pdf');
            header('Content-Disposition: inline; filename="' . $outputPdfName . '"');
            header('Content-Length: ' . filesize($phpPdfLocation));
            readfile($phpPdfLocation);
            
            // (Opsional) Hapus file setelah ditampilkan agar tidak memenuhi harddisk
            // unlink($phpPdfLocation); 
            exit;
        } else {
            echo "Error: File PDF gagal dibuat oleh Tomcat.";
        }

    } catch (JavaException $e) {
        echo "<b>Error dari Java/Tomcat saat Generate Jasper:</b><br/>";
        echo "Pesan: " . $e->getCause() . "<br/>";
        echo "<pre>" . $e->getTraceAsString() . "</pre>";
    } catch (Exception $e) {
        echo "<b>Error PHP:</b> " . $e->getMessage();
    }
}

// ==========================================
// CARA MENGGUNAKAN FUNGSI DI ATAS:
// ==========================================

$dbInfo = [
    'host'     => 'firebird',
    'port'     => 3050,
    'database' => '/firebird/data/lsu.fdb',
    'username' => 'SYSDBA',
    'password' => 'masterkey'
];

// Parameter yang dikirim ke laporan (Harus sesuai dengan nama Parameter di Jaspersoft Studio)
$parameterLaporan = [
    'co_id' => 'LSU',
    'LOGO_URL' => ''
];

// Eksekusi (Pastikan file laporan_saya.jasper sudah ada di folder reports!)
generateJasperPDF('account_master_report.jasper', 'hasil_laporan_' . time() . '.pdf', $parameterLaporan, $dbInfo);

?>