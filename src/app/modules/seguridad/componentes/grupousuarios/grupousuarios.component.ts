import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupousuariosService } from 'src/app/services/grupousuarios.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-grupousuarios',
  templateUrl: './grupousuarios.component.html',
  styleUrls: ['./grupousuarios.component.css']
})
export class GrupousuariosComponent implements OnInit {
  GrupousuarioForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario

  GrupoUsuarios: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos

  // modalvisibility: boolean = false; //variable para visibilidad de formulariod de agregar usuario a traves de modal
  // modalvisibility2: boolean = false; //variable para visibilidad de formulario de modificacion a traves de modal

  modificarGrupoUsuarioForm: FormGroup; // Formulario para modificar usuario
  GrupousuarioSeleccionado: any = null; // Variable para almacenar el usuario seleccionado

  constructor(private GrupoUsuario: GrupousuariosService, private fb: FormBuilder) {
    // Inicializamos el formulario con el campo Descripcion
    this.GrupousuarioForm = this.fb.group({
      Descripcion: ['', Validators.required] //campo obligatorio
    });

    // Formulario de modificación de Grupousuarios
    this.modificarGrupoUsuarioForm = this.fb.group({
      Descripcion: ['', Validators.required] //campo obligatorio
    });
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarGrupoUsuarios();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarGrupoUsuarios() {
    this.GrupoUsuario.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.GrupoUsuarios = response;  // Asigna los usuarios recibidos  
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.GrupoUsuarios = [];  // Si la respuesta no es válida, se asigna un array vacío
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
    if (this.GrupousuarioForm.valid) {
      const usuarioData = this.GrupousuarioForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.GrupoUsuario.alta(usuarioData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Usuario creado con éxito');  //  Se muestra un mensaje de éxito
            this.GrupousuarioForm.reset();  // Se resetea el formulario
            this.recuperarGrupoUsuarios();  // Se actualiza la lista de usuarios
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
  editarGrupoUsuario(Grupousuario: any) {
    this.GrupousuarioSeleccionado = Grupousuario;
    this.modificarGrupoUsuarioForm.patchValue({
      Descripcion: Grupousuario.Descripcion
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarGrupoUsuarioForm.valid) {
      const GrupousuarioModificado = {
        ...this.GrupousuarioSeleccionado,
        ...this.modificarGrupoUsuarioForm.value
      };
      this.GrupoUsuario.modificar(GrupousuarioModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Usuario modificado con éxito');
            this.GrupousuarioSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarGrupoUsuarios(); // Actualizar la lista de usuarios
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







  // bajaUsuario(IdUsuarios: number) {
  //   this.databaseService.baja(IdUsuarios).subscribe({
  //     next: (response) => {
  //       if (response['resultado'] === 'OK') {
  //         alert('Usuario borrado con éxito');
  //         this.recuperarUsuarios();
  //       } else {
  //         alert('Error al borrar usuario');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al borrar usuario:', error);
  //     }
  //   });
  // }

  /*MostrarFormulario() {
    this.modalvisibility = !this.modalvisibility
  }*/

  /* MostrarFormularioModificacion() {
     this.modalvisibility2 = !this.modalvisibility2
   }*/
}
