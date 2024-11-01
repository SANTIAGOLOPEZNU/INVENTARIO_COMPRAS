import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ParametrosService } from 'src/app/services/parametros.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.component.html',
  styleUrls: ['./destinatario.component.css']
})
export class DestinatarioComponent {
  DestinatarioForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario
  modificarDestinatarioForm: FormGroup; // Formulario para modificar usuario
  Destinatarios: any[] = [];  // Arreglo para almacenar los usuarios recuperados de la base de datos
  DestinatarioSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  constructor(private servicioDestinatario: ParametrosService, private fb: FormBuilder) {
    // Inicializamos el formulario con el campo Descripcion
    this.DestinatarioForm = this.fb.group({
      Domicilio: ['', Validators.required], //campo obligatorio
      Localidad: ['', Validators.required],
      CondIVA: ['', Validators.required],
      Cuit: ['', Validators.required],
      Nombre: ['', Validators.required],
    });
    // Formulario de modificación de Grupousuarios
    this.modificarDestinatarioForm = this.fb.group({
      Domicilio: ['', Validators.required], //campo obligatorio
      Localidad: ['', Validators.required],
      CondIVA: ['', Validators.required],
      Cuit: ['', Validators.required],
      Nombre: ['', Validators.required],

    });
  }
  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarInsumos();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
  }
  // Método para recuperar la lista de usuarios de la base de datos
  recuperarInsumos() {
    this.servicioDestinatario.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.Destinatarios = response;  // Asigna los usuarios recibidos  
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.Destinatarios = [];  // Si la respuesta no es válida, se asigna un array vacío
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
    if (this.DestinatarioForm.valid) {
      const InsumosData = this.DestinatarioForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioDestinatario.alta(InsumosData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            Swal.fire({
              title: 'Completado!',
              text: "Destinatario subido con éxito",
              icon: "success"
            });

            this.DestinatarioForm.reset();  // Se resetea el formulario
            this.recuperarInsumos();  // Se actualiza la lista de usuarios
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
      Swal.fire({
        title: 'Error!',
        text: "Revise los campos",
        icon: "error"
      });
    }
  }
  // Método para seleccionar un usuario y poblar el formulario de modificación
  editarDestinatario(Destinatario: any) {
    this.DestinatarioSeleccionado = Destinatario;
    this.modificarDestinatarioForm.patchValue({
      Domicilio: Destinatario.Domicilio,
      Localidad: Destinatario.Localidad,
      CondIVA: Destinatario.CondIVA,
      Cuit: Destinatario.Cuit,
      Nombre: Destinatario.Nombre_Destinatario
    });
  }
  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarDestinatarioForm.valid) {
      const InsumoModificado = {
        ...this.DestinatarioSeleccionado,
        ...this.modificarDestinatarioForm.value
      };
      this.servicioDestinatario.modificar(InsumoModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            Swal.fire({
              title: 'Completado!',
              text: "Destinatario modificado con éxito",
              icon: "success"
            });
            this.DestinatarioSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarInsumos(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar Insumo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: "Revise los campos",
            icon: "error"
          });
          console.error('Error:', error);
        },
      });
    }
  }
}