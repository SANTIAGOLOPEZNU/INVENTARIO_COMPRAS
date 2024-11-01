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
if (isset($params->CodProvedor) && isset($params->RazonSocial) && isset($params->Direccion)  && isset($params->Email)  && isset($params->CodPostal) && isset($params->CodPostal) && isset($params->Ciudad) 
&& isset($params->Telefono ) && isset($params->CondIVA ) && isset($params->CUIT ) && isset($params->InicioAct )) {
    try {
        // Preparar la consulta SQL de actualización
        $stmt = $conn->prepare("UPDATE Proveedores 
        SET CodProvedor = :CodProvedor,
            RazonSocial = :RazonSocial, 
            Direccion = :Direccion, 
            Email = :Email, 
            CodPostal = :CodPostal, 
            Ciudad = :Ciudad, 
            Telefono = :Telefono, 
            CondIVA = :CondIVA, 
            Cuit = :CUIT, 
            InicioAct = :InicioAct 
        WHERE IdProvedor = :IdProveedor;");
        
        // Ejecutar la consulta con los parámetros proporcionados
        $stmt->execute([
            ':IdProveedor' => $params -> IdProvedor,
            ':CodProvedor' =>$params -> CodProvedor,
            ':RazonSocial'=> $params->RazonSocial,
            ':Direccion' => $params->Direccion,
            ':Email'=> $params->Email,
            ':CodPostal' => $params->CodPostal,
            ':Ciudad' => $params->Ciudad,
            ':Telefono' => $params->Telefono,
            ':CondIVA' => $params->CondIVA,
            ':CUIT' => $params->CUIT,
            ':InicioAct' => $params->InicioAct,

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