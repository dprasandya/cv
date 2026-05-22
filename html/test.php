<?php
// Tentukan variabel dari session
$dbhost = (string)$_SESSION['site']['db']['host'];
$dbport = (int)$_SESSION['site']['db']['port'];
$dbname = (string)$_SESSION['site']['db']['database'];
$dbuser = (string)$_SESSION['site']['db']['username'];
$dbpass = (string)$_SESSION['site']['db']['password'];

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

} catch (JavaException $e) {
    // INI AKAN MENAMPILKAN PENYEBAB ASLI JIKA GAGAL
    echo "<span style='color:red;'><b>Gagal Terhubung (Error dari Java Tomcat):</b></span><br/>";
    echo "Pesan: " . $e->getCause() . "<br/>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
} catch (Exception $e) {
    echo "Error PHP: " . $e->getMessage();
}
?>