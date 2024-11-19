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

include("../conexion.php");

try {
    $stmt = $conn->prepare("INSERT INTO Proveedores (CodProvedor, RazonSocial, Direccion, Email, CodPostal, Ciudad, Telefono, CondIVA, Cuit, InicioAct) VALUES (:CodProvedor, :RazonSocial, :Direccion, :Email, :CodPostal, :Ciudad, :Telefono, :CondIVA, :CUIT, :InicioAct)");
    $stmt->bindParam(':CodProvedor', $params->CodProvedor);
    $stmt->bindParam(':RazonSocial', $params->RazonSocial);
    $stmt->bindParam(':Direccion', $params->Direccion);
    $stmt->bindParam(':Email', $params->Email);
    $stmt->bindParam(':CodPostal', $params->CodPostal);
    $stmt->bindParam(':Ciudad', $params->Ciudad);
    $stmt->bindParam(':Telefono', $params->Telefono);
    $stmt->bindParam(':CondIVA', $params->CondIVA);
    $stmt->bindParam(':CUIT', $params->CUIT);
    $stmt->bindParam(':InicioAct', $params->InicioAct);

    if ($stmt->execute()) {
        echo json_encode(['resultado' => 'OK', 'mensaje' => 'Datos grabados']);
    } else {
        echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'No se pudo insertar los datos']);
    }
} catch (PDOException $e) {
    echo json_encode(['resultado' => 'ERROR', 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
