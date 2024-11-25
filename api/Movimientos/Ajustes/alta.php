<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

if ($params === null) {
    echo json_encode(['error' => 'No se recibieron datos o el formato es incorrecto']);
    exit;
}

include("../../conexion.php");

try {
    if (!isset($params->Fecha) || !isset($params->Hora) || !isset($params->Responsable) || !isset($params->Observacion)) {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Faltan datos requeridos']);
        exit;
    }

    // Asegúrate de que los nombres de los parámetros coincidan
    $stmt = $conn->prepare("INSERT INTO CabeceraAjustes (Fecha, Hora, Responsable, Observacion)
    VALUES (:Fecha, :Hora, :Responsable, :Observacion)");
    $stmt->bindParam(':Fecha', $params->Fecha);
    $stmt->bindParam(':Hora', $params->Hora);
    $stmt->bindParam(':Responsable', $params->Responsable);
    $stmt->bindParam(':Observacion', $params->Observacion);

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
