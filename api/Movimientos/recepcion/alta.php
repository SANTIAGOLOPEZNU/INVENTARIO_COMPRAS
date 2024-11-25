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

include("../../conexion.php");

try {
    if (!isset($params->Fecha) || !isset($params->NroRemito) || !isset($params->CondVenta) || !isset($params->NroOrdenCompra) || !isset($params->FirmaDigital) || !isset($params->NroFact) || !isset($params->IdProveedor)) {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Faltan datos requeridos']);
        exit;
    }

    // Asegúrate de que los nombres de los parámetros coincidan
    $stmt = $conn->prepare("INSERT INTO CabeceraReciboRecep (Fecha, IdProveedor, NroRemito, CondVenta, NroOrdenCompra, FirmaDigital, NroFact) VALUES (:Fecha, :IdProveedor, :NroRemito, :CondVenta, :NroOrdenCompra, :FirmaDigital, :NroFact)");
    $stmt->bindParam(':Fecha', $params->Fecha);
    $stmt->bindParam(':IdProveedor', $params->IdProveedor);
    $stmt->bindParam(':NroRemito', $params->NroRemito);
    $stmt->bindParam(':CondVenta', $params->CondVenta);
    $stmt->bindParam(':NroOrdenCompra', $params->NroOrdenCompra); // Cambiado de ':IdGrupo' a ':Grupo'
    $stmt->bindParam(':FirmaDigital', $params->FirmaDigital);
    $stmt->bindParam(':NroFact', $params->NroFact); // Cambiado de ':IdGrupo' a ':Grupo'

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
