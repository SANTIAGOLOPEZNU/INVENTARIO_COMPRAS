<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');

// Obtener los datos enviados desde el frontend
$json = file_get_contents('php://input');
$params = json_decode($json);

// Incluir la conexión a la base de datos
include("../../conexion.php");

// Verificar si los parámetros necesarios están presentes
if (isset($params->Fecha) && isset($params->Hora) && isset($params->AreaMunicipal) && isset($params->ResponsableEntrega) && isset($params->NroRemito) && isset($params->Observaciones)) {
    try {
        // Preparar la consulta SQL de actualización
        $stmt = $conn->prepare("UPDATE Cabecera_Despacho SET Fecha = :Fecha, Hora = :Hora, Area_Municipal = :AreaMunicipal,
         Responsable_Entrega = :ResponsableEntrega, Nro_Remito_Despacho = :NroRemito, Observaciones = :Observaciones, Id_Destinatario = :IdDestinatario  WHERE Id_Despacho = :IdDespacho");

        // Ejecutar la consulta con los parámetros proporcionados
        $stmt->execute([
            ':Fecha' => $params->Fecha,
            ':Hora' => $params->Hora,
            ':AreaMunicipal' => $params->AreaMunicipal,
            ':ResponsableEntrega' => $params->ResponsableEntrega,
            ':NroRemito' => $params->NroRemito,
            ':Observaciones'=> $params->Observaciones,
            ':IdDestinatario' => $params->IdDestinatario,
            ':IdDespacho' => $params->IdDespacho,
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
