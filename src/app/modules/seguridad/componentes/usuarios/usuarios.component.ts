import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GrupousuariosService } from 'src/app/services/grupousuarios.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarioForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario
  usuarios: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos
  modalvisibility: boolean = false; //variable para visibilidad de formulariod de agregar usuario a traves de modal
  modalvisibility2: boolean = false; //variable para visibilidad de formulario de modificacion a traves de modal
  modificarUsuarioForm: FormGroup; // Formulario para modificar usuario
  usuarioSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  roles: any[] = []; // Arreglo donde se van a guardar los grupos

  
  constructor(private databaseService: UsuariosService, private fb: FormBuilder, private GrupoUsuario: GrupousuariosService) {
    // Inicializamos el formulario con tres campos: NombreUsuario, Mail y Clave
    this.usuarioForm = this.fb.group({
      NombreUsuario: ['', Validators.required],  // Campo obligatorio
      Mail: ['', [Validators.required, Validators.email]],  // Campo obligatorio y validación de formato de email
      Clave: ['', [Validators.required, Validators.minLength(6)]], // Campo obligatorio con longitud mínima de 6 caracteres
      Grupo: [0, Validators.required] //campo obligatorio
    });

    // Formulario de modificación de usuarios
    this.modificarUsuarioForm = this.fb.group({
      NombreUsuario: ['', Validators.required],
      Mail: ['', [Validators.required, Validators.email]],
      Clave: ['', [Validators.required, Validators.minLength(6)]],
      Grupo: [0, Validators.required]
    });
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarUsuarios();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
    this.recuperarGrupoUsuarios();
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarUsuarios() {
    this.databaseService.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.usuarios = response; // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.usuarios = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar usuarios:', error);
      }
    });
  }

  // Metodo para mostrar a lista de grupos/usuarios de la base de datos
  recuperarGrupoUsuarios() {
    this.GrupoUsuario.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.roles = response;  // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.roles = [];  // Si la respuesta no es válida, se asigna un array vacío
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
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.databaseService.alta(usuarioData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            Swal.fire({
              title: 'Bienvenido!',
              text: " Se ha registrado con éxito",
              icon: "success"
            });
           this.usuarioForm.reset();  // Se resetea el formulario
            this.recuperarUsuarios();  // Se actualiza la lista de usuarios

          } else {
            // Si hay un error, se muestra el mensaje recibido del servidor
            console.log('Error al crear usuario: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          console.error('Error:', error);  // Se registra el error en la consola
        },
      });
    }
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarUsuarioForm.valid) {
      const usuarioModificado = {
        ...this.usuarioSeleccionado,
        ...this.modificarUsuarioForm.value
      };
      this.databaseService.modificar(usuarioModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Usuario modificado con éxito');
            this.usuarioSeleccionado = null; // Ocultar el formulario después de modificar
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
  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.modificarUsuarioForm.patchValue({
      NombreUsuario: usuario.NombreUsuario,
      Mail: usuario.Mail,
      Clave: usuario.Clave
    });
  }
  
  MostrarFormulario() {
    this.modalvisibility = !this.modalvisibility
  }

  MostrarFormularioModificacion() {
    this.modalvisibility2 = !this.modalvisibility2
  }
}
