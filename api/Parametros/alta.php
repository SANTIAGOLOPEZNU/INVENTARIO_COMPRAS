<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

if ($params === null) {
    echo json_encode(['error' => 'No se recibieron datos o el formato es incorrecto']);
    exit;
}

include("conexion.php");

try {
    $stmt = $conn->prepare("INSERT INTO Destinatario
     (Domicilio, Localidad, CondIVA, Cuit, Nombre_Destinatario)
      VALUES (:Domicilio, :Localidad, :CondIVA, :Cuit, :Nombre)");
    $stmt->bindParam(':Domicilio', $params->Domicilio);
    $stmt->bindParam(':Localidad', $params->Localidad);
    $stmt->bindParam(':CondIVA', $params->CondIVA);
    $stmt->bindParam(':Cuit', $params->Cuit);
    $stmt->bindParam(':Nombre', $params->Nombre);

    if ($stmt->execute()) {
        echo json_encode(['resultado' => 'OK', 'mensaje' => 'Datos grabados']);
    } else {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'No se pudo insertar los datos']);
    }
} catch (PDOException $e) {
    echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
