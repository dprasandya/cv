<%@ page import="java.sql.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head><title>Tes Koneksi Firebird Tomcat</title></head>
<body style="font-family: Arial, sans-serif; margin: 40px;">

    <h2>Diagnostic Koneksi FirebirdSQL</h2>
    
    <%
        // ==========================================
        // UBAH KONFIGURASI INI SESUAI DATABASE ANDA
        // ==========================================
        String host = "172.16.16.10";
        String port = "3050"; // Port default Firebird
        
        // Path ke database (Linux: //opt/firebird/db.fdb | Windows: C:/path/db.fdb)
        String dbPath = "/var/db/datacvjasa/lsu.fdb"; 
        
        String url = "jdbc:firebirdsql://" + host + ":" + port + "/" + dbPath;
        String user = "SYSDBA";
        String password = "masterkey";
        // ==========================================

        String driver = "org.firebirdsql.jdbc.FBDriver";
        Connection conn = null;

        out.println("<ul>");
        
        // 1. Cek Driver
        try {
            Class.forName(driver);
            out.println("<li style='color: green;'>[OK] Driver Jaybird (FBDriver) ditemukan di library Tomcat!</li>");
        } catch (ClassNotFoundException e) {
            out.println("<li style='color: red;'>[GAGAL] Driver Jaybird tidak terbaca. Pastikan file .jar sudah ada di /usr/local/tomcat/lib/. Error: " + e.getMessage() + "</li>");
        }

        // 2. Cek Koneksi
        try {
            out.println("<li>Mencoba koneksi ke: <code>" + url + "</code>...</li>");
            conn = DriverManager.getConnection(url, user, password);
            out.println("<li style='color: green; font-weight: bold;'>[SUKSES] Koneksi ke FirebirdSQL berhasil dibuka! Tomcat siap digunakan.</li>");
        } catch (SQLException e) {
            out.println("<li style='color: red; font-weight: bold;'>[GAGAL] Koneksi ditolak oleh server Firebird: " + e.getMessage() + "</li>");
        } finally {
            if (conn != null) {
                try { conn.close(); } catch (SQLException ignore) {}
            }
        }
        
        out.println("</ul>");
    %>

</body>
</html>