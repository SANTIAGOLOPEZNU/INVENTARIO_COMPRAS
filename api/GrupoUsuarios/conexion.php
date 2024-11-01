
<?php
$servername = "172.16.20.30";
$username = "desarrollo";
$password = "fisca1234";
$dbname = "SisInventarios";

try {
    // Crear una nueva conexión PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Configurar el modo de error de PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
}

// Cerrar la conexión (PDO la cierra automáticamente al final del script)
?>