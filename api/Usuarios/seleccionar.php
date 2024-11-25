<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  include("../conexion.php");


  $registros=mysqli_query($con,"select IdUsuarios, IdGrupo, NombreUsuario, Mail, Clave from Usuarios where IdUsuario=$_GET[codigo]");
    
  if ($reg=mysqli_fetch_array($registros))  
  {
    $vec[]=$reg;
  }
  
  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');
?>