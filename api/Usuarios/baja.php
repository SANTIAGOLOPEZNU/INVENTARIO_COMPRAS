<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');


  include("conexion.php");

   // Verificamos si el parámetro IdUsuarios está presente
  if (isset($_GET['IdUsuarios'])) {
      $IdUsuarios = $_GET['IdUsuarios'];

      // Preparamos la consulta usando PDO
      try {
          $stmt = $conn->prepare("DELETE FROM Usuarios WHERE IdUsuarios = :IdUsuarios");
          $stmt->bindParam(':IdUsuarios', $IdUsuarios);

          if ($stmt->execute()) {
              $response = ['resultado' => 'OK', 'mensaje' => 'Usuario borrado'];
          } else {
              $response = ['resultado' => 'ERROR', 'mensaje' => 'Error al borrar usuario'];
          }
      } catch (PDOException $e) {
          $response = ['resultado' => 'ERROR', 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()];
      }

  } else {
      $response = ['resultado' => 'ERROR', 'mensaje' => 'Falta el parámetro IdUsuarios'];
  }

  header('Content-Type: application/json');
  echo json_encode($response);

  
?>