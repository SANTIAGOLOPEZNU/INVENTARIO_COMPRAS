import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-recepcion-materiales',
  templateUrl: './recepcion-materiales.component.html',
  styleUrls: ['./recepcion-materiales.component.css']
})
export class RecepcionMaterialesComponent implements OnInit {
  recepcionMaterialesForm: FormGroup;  // Formulario reactivo para manejar los datos del recepcion de materiales
  cabeceraRecibo: any[] = [];  // Variable para almacenar las recepciones de materiales de la base de datos
  modificarRecepcionMaterialesForm: FormGroup; // Formulario para modificar usuario
  cabeceraReciboSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  proveedores: any[] = []; // Arreglo donde se van a guardar los proveedores

  
  constructor(private servicioMovimientos: MovimientosService, private fb: FormBuilder, private ProveedoresService: ProveedoresService ) {
    // Inicializamos el formulario con tres campos: NombreUsuario, Mail y Clave
    this.recepcionMaterialesForm = this.fb.group({
      Fecha: ['', Validators.required],  // Campo obligatorio
      NroRemito: [0, Validators.required],  // Campo obligatorio
      CondVenta: ['', Validators.required], // Campo obligatorio
      NroOrdenCompra: [0, Validators.required], //campo obligatorio
      FirmaDigital: ['', Validators.required], //campo obligatorio
      NroFact: [0, Validators.required], //campo obligatorio
      IdProveedor: [0, Validators.required]
    });

    // Formulario de modificación de usuarios
    this.modificarRecepcionMaterialesForm = this.fb.group({
      Fecha: ['', Validators.required],  // Campo obligatorio
      NroRemito: [0, Validators.required],  // Campo obligatorio
      CondVenta: ['', Validators.required], // Campo obligatorio
      NroOrdenCompra: [0, Validators.required], //campo obligatorio
      FirmaDigital: ['', Validators.required], //campo obligatorio
      NroFact: [0, Validators.required], //campo obligatorio
      IdProveedor: [0, Validators.required]
    });
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarUsuarios();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
    this.recuperarProveedores();
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarUsuarios() {
    this.servicioMovimientos.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.cabeceraRecibo = response; // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.cabeceraRecibo = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar usuarios:', error);
      }
    });
  }

  //Metodo para mostrar a lista de grupos/usuarios de la base de datos
  recuperarProveedores() {
    this.ProveedoresService.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.proveedores = response;  // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.proveedores = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar usuarios:', error);
      }
    });
  }

  // Método para manejar el envío del formulario
  submitForm() {
    // Solo continúa si el formulario es válido
    if (this.recepcionMaterialesForm.valid) {
      const usuarioData = this.recepcionMaterialesForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioMovimientos.alta(usuarioData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Usuario creado con éxito');  //  Se muestra un mensaje de éxito
            this.recepcionMaterialesForm.reset();  // Se resetea el formulario
            this.recuperarUsuarios();  // Se actualiza la lista de usuarios
            console.log(usuarioData)
          } else {
            // Si hay un error, se muestra el mensaje recibido del servidor
            alert('Error al crear usuario: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          // En caso de error, se muestra un mensaje de error
          alert('Error al crear usuario');
          console.error('Error:', error);  // Se registra el error en la consola
        },
      });
    } else {
      // Si el formulario no es válido, se muestra un mensaje al usuario
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarRecepcionMaterialesForm.valid) {
      const usuarioModificado = {
        ...this.cabeceraReciboSeleccionado,
        ...this.modificarRecepcionMaterialesForm.value
      };
      this.servicioMovimientos.modificar(usuarioModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Usuario modificado con éxito');
            this.cabeceraReciboSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarUsuarios(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar usuario: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar usuario');
          console.error('Error:', error);
        },
      });
    }
  }

  // Método para seleccionar un usuario y poblar el formulario de modificación
  editarRecepcionMateriales(recibo: any) {
    this.cabeceraReciboSeleccionado = recibo;
    this.modificarRecepcionMaterialesForm.patchValue({
      Fecha: recibo.Fecha,
      NroRemito: recibo.NroRemito,
      CondVenta: recibo.CondVenta,
      NroOrdenCompra: recibo.NroOrdenCompra,
      FirmaDigital: recibo.FirmaDigital,
      NroFact: recibo.NroFact,
      IdProveedor: recibo.IdProveedor
    });
  }
}
