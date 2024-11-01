<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$mail = $data['mail'];
$clave = $data['clave'];

try {
    // Consulta SQL para obtener el usuario con el correo y la contraseña proporcionados
    $sql = "SELECT * FROM Usuarios WHERE Mail = :mail AND Clave = :clave";
    $stmt = $conn->prepare($sql);

    // Vincular los parámetros (correo y contraseña)
    $stmt->bindParam(':mail', $mail);
    $stmt->bindParam(':clave', $clave);

    // Ejecutar la consulta
    $stmt->execute();

    // Verificar si se encontró alguna coincidencia
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]); // Login exitoso
    } else {
        echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}

// PDO cierra automáticamente la conexión al final del script
?>
