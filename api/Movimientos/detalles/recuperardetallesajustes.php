    <?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json'); // Asegúrate de que el tipo de contenido sea JSON

    include("../../conexion.php");


    $idRecibo = $_GET['recibo'] ?? null;

    if ($idRecibo === null) {
        echo json_encode(['error' => 'No se recibieron datos']);
        exit;
    }

    try {
        // Preparar y ejecutar la consulta usando PDO
        $stmt = $conn->prepare("
        SELECT DetalleReciboRecepcion.*,  
            CabeceraAjustes.Id_Ajuste,
            InsumosMateriales.Descripcion
        FROM DetalleReciboRecepcion 
        INNER JOIN CabeceraAjustes 
            ON DetalleReciboRecepcion.Id_Ajuste = CabeceraAjustes.Id_Ajuste
        INNER JOIN InsumosMateriales 
            ON DetalleReciboRecepcion.IdInsumosMat = InsumosMateriales.IdInsumosMat
        WHERE DetalleReciboRecepcion.Id_Ajuste = :Id_Ajuste
    ");


    $stmt->bindParam(':Id_Ajuste', $idRecibo, PDO::PARAM_INT);   



    $stmt->execute();



        // Obtener todos los resultados como un array asociativo
        $vec = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$vec) {
            // Si no hay resultados, devolver un array vacío
            $vec = [];
        }

        // Codificar los resultados en JSON
        $cad = json_encode($vec);

        // Enviar el contenido JSON como respuesta
        header('Content-Type: application/json');
        echo $cad;
    } catch (PDOException $e) {
        // En caso de error, mostrar un mensaje de error en JSON
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }