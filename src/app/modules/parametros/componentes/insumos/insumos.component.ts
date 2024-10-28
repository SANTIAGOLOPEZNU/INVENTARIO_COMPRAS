import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InsumosService } from 'src/app/services/insumos.service';


@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  InsumoForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario

  Insumos: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos

  // modalvisibility: boolean = false; //variable para visibilidad de formulariod de agregar usuario a traves de modal
  // modalvisibility2: boolean = false; //variable para visibilidad de formulario de modificacion a traves de modal

  modificarInsumosForm: FormGroup; // Formulario para modificar usuario
  InsumoSeleccionado: any = null; // Variable para almacenar el usuario seleccionado

  constructor(private servicioInsumos: InsumosService, private fb: FormBuilder) {
    // Inicializamos el formulario con el campo Descripcion
    this.InsumoForm = this.fb.group({
      CodInterno: [0, Validators.required], //campo obligatorio
      Descripcion: ['', Validators.required], //campo obligatorio
    });

    // Formulario de modificación de Grupousuarios
    this.modificarInsumosForm = this.fb.group({
      CodInterno: [0, Validators.required], //campo obligatorio
      Descripcion: ['', Validators.required], //campo obligatorio
    });
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarInsumos();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarInsumos() {
    this.servicioInsumos.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.Insumos = response;  // Asigna los usuarios recibidos  
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.Insumos = [];  // Si la respuesta no es válida, se asigna un array vacío
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
    if (this.InsumoForm.valid) {
      const InsumosData = this.InsumoForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioInsumos.alta(InsumosData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Usuario creado con éxito');  //  Se muestra un mensaje de éxito
            this.InsumoForm.reset();  // Se resetea el formulario
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
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  // Método para seleccionar un usuario y poblar el formulario de modificación
  editarInsumo(Insumo: any) {
    this.InsumoSeleccionado = Insumo;
    this.modificarInsumosForm.patchValue({
      CodInterno: Insumo.CodInterno,
      Descripcion: Insumo.Descripcion
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarInsumosForm.valid) {
      const InsumoModificado = {
        ...this.InsumoSeleccionado,
        ...this.modificarInsumosForm.value
      };
      this.servicioInsumos.modificar(InsumoModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Insumo modificado con éxito');
            this.InsumoSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarInsumos(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar Insumo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar insumo');
          console.error('Error:', error);
        },
      });
    }
  }

}
