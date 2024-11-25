<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Permitir métodos HTTP
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$json = file_get_contents('php://input');
error_log($json); // Esto escribirá el contenido en el log de errores
$params = json_decode($json);

if ($params === null) {
    echo json_encode(['error' => 'No se recibieron datos o el formato es incorrecto']);
    exit;
}

include("../../conexion.php");

try {
    if (!isset($params->DetailData->IdInsumosMat) || !isset($params->DetailData->Cantidad) || !isset($params->Despacho)) {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Faltan datos requeridos']);
        exit;
    }
    // Asegúrate de que los nombres de los parámetros coincidan
    $stmt = $conn->prepare("INSERT INTO DetalleReciboRecepcion (IdInsumosMat, Cantidad, Id_Despacho) VALUES (:IdInsumosMat, :Cantidad, :Id_Despacho)");
    $stmt->bindParam(':IdInsumosMat', $params->DetailData->IdInsumosMat);
    $stmt->bindParam(':Cantidad',$params->DetailData->Cantidad);
    $stmt->bindParam(':Id_Despacho', $params->Despacho);    
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
