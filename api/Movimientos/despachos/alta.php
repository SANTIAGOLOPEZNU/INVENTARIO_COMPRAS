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

if (!isset($params->IdDestinatario) || !isset($params->Fecha) || !isset($params->Hora) || !isset($params->AreaMunicipal) 
    || !isset($params->ResponsableEntrega) || !isset($params->NroRemito) || !isset($params->Observaciones)) {
    echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Faltan datos requeridos']);
    exit;
}

// Asegúrate de que los nombres de los parámetros coincidan
$stmt = $conn->prepare("INSERT INTO Cabecera_Despacho (Id_Destinatario, Fecha, Hora, Area_Municipal, Responsable_Entrega, Nro_Remito_Despacho, Observaciones) 
    VALUES (:Id_Destinatario, :Fecha, :Hora, :AreaMunicipal, :ResponsableEntrega, :NroRemito, :Observaciones)");

$stmt->bindParam(':Id_Destinatario', $params->IdDestinatario);
$stmt->bindParam(':Fecha', $params->Fecha);
$stmt->bindParam(':Hora', $params->Hora);
$stmt->bindParam(':AreaMunicipal', $params->AreaMunicipal);
$stmt->bindParam(':ResponsableEntrega', $params->ResponsableEntrega);
$stmt->bindParam(':NroRemito', $params->NroRemito);
$stmt->bindParam(':Observaciones', $params->Observaciones);


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
