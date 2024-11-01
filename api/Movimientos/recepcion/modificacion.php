<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Obtener los datos enviados desde el frontend
$json = file_get_contents('php://input');
$params = json_decode($json);

// Incluir la conexión a la base de datos
include("conexion.php");

// Verificar si los parámetros necesarios están presentes
if (isset($params->Fecha) && isset($params->NroRemito) && isset($params->CondVenta) && isset($params->NroOrdenCompra) && isset($params->FirmaDigital) && isset($params->NroFact)) {
    try {
        // Preparar la consulta SQL de actualización
        $stmt = $conn->prepare("UPDATE CabeceraReciboRecep SET Fecha = :Fecha, NroRemito = :NroRemito, CondVenta = :CondVenta, NroOrdenCompra = :NroOrdenCompra, FirmaDigital = :FirmaDigital, NroFact = :NroFact, IdProveedor = :IdProveedor  WHERE IdRecibo_Recepcion = :IdRecibo_Recepcion");

        // Ejecutar la consulta con los parámetros proporcionados
        $stmt->execute([
            ':Fecha' => $params->Fecha,
            ':NroRemito' => $params->NroRemito,
            ':CondVenta' => $params->CondVenta,
            ':NroOrdenCompra' => $params->NroOrdenCompra,
            ':FirmaDigital' => $params->FirmaDigital,
            ':NroFact'=> $params->NroFact,
            ':IdProveedor' => $params->IdProveedor,
            ':IdRecibo_Recepcion' => $params->IdRecibo_Recepcion,
        ]);

        $response = array("resultado" => "OK", "mensaje" => "Datos modificados");
    } catch (PDOException $e) {
        $response = array("resultado" => "ERROR", "mensaje" => "Error en la actualización: " . $e->getMessage());
    }
} else {
    $response = array("resultado" => "ERROR", "mensaje" => "Datos incompletos");
}

// Enviar la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
