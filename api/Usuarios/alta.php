<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir métodos HTTP
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

if ($params === null) {
    echo json_encode(['error' => 'No se recibieron datos o el formato es incorrecto']);
    exit;
}

include("<div class="">conexion.php");

try {
    if (!isset($params->NombreUsuario) || !isset($params->Mail) || !isset($params->Clave) || !isset($params->Grupo)) {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Faltan datos requeridos']);
        exit;
    }
    // Asegúrate de que los nombres de los parámetros coincidan
    $stmt = $conn->prepare("INSERT INTO Usuarios (NombreUsuario, Mail, Clave, IdGrupo) VALUES (:NombreUsuario, :Mail, :Clave, :Grupo)");
    $stmt->bindParam(':NombreUsuario', $params->NombreUsuario);
    $stmt->bindParam(':Mail', $params->Mail);
    $stmt->bindParam(':Clave', $params->Clave);
    $stmt->bindParam(':Grupo', $params->Grupo); // Cambiado de ':IdGrupo' a ':Grupo'
    
    if ($stmt->execute()) {
        echo json_encode(['resultado' => 'OK', 'mensaje' => 'Datos grabados']);
    } else {
        print_r($stmt->errorInfo()); // Muestra errores si los hay
        
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'No se pudo insertar los datos']);
    }
} catch (PDOException $e) {
    echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
