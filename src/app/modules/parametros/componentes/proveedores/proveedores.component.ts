import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  ProveedorForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario

  Proveedores: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos

  // modalvisibility: boolean = false; //variable para visibilidad de formulariod de agregar usuario a traves de modal
  // modalvisibility2: boolean = false; //variable para visibilidad de formulario de modificacion a traves de modal

  modificarProvedorForm: FormGroup; // Formulario para modificar usuario
  ProvedorSeleccionado: any = null; // Variable para almacenar el usuario seleccionado

  constructor(private servicioProveedores: ProveedoresService, private fb: FormBuilder) {
    // Inicializamos el formulario con el campo Descripcion
    this.ProveedorForm = this.fb.group({
      CodProvedor: [0, Validators.required], //campo obligatorio
      RazonSocial: ['', Validators.required], //campo obligatorio
      Direccion: ['', Validators.required], //campo obligatorio
      Email: ['', [Validators.required, Validators.email]], //campo obligatorio
      CodPostal: [0, [Validators.required, Validators.maxLength(4)]], //campo obligatorio
      Ciudad: ['', Validators.required], //campo obligatorio
      Telefono: ['', Validators.required], //campo obligatorio
      CondIVA: ['', Validators.required], //campo obligatorio
      CUIT: [0, [Validators.required, Validators.maxLength(11)]], //campo obligatorio
      InicioAct: ['', Validators.required], //campo obligatorio
    });

    // Formulario de modificación de Grupousuarios
    this.modificarProvedorForm = this.fb.group({
      CodProvedor: [0, Validators.required], //campo obligatorio
      RazonSocial: ['', Validators.required], //campo obligatorio
      Direccion: ['', Validators.required], //campo obligatorio
      Email: ['', Validators.required, Validators.email], //campo obligatorio
      CodPostal: [0, Validators.required], //campo obligatorio
      Ciudad: ['', Validators.required], //campo obligatorio
      Telefono: ['', Validators.required], //campo obligatorio
      CondIVA: ['', Validators.required], //campo obligatorio
      CUIT: [0, Validators.required], //campo obligatorio
      InicioAct: ['', Validators.required], //campo obligatorio
    });
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarProveedores();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarProveedores() {
    this.servicioProveedores.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.Proveedores = response;  // Asigna los usuarios recibidos  
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.Proveedores = [];  // Si la respuesta no es válida, se asigna un array vacío
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
    if (this.ProveedorForm.valid) {
      const usuarioData = this.ProveedorForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioProveedores.alta(usuarioData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Usuario creado con éxito');  //  Se muestra un mensaje de éxito
            this.ProveedorForm.reset();  // Se resetea el formulario
            this.recuperarProveedores();  // Se actualiza la lista de usuarios
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
  editarUsuario(Grupousuario: any) {
    this.ProvedorSeleccionado = Grupousuario;
    this.modificarProvedorForm.patchValue({
      Descripcion: Grupousuario.Descripcion
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarProvedorForm.valid) {
      const GrupousuarioModificado = {
        ...this.ProvedorSeleccionado,
        ...this.modificarProvedorForm.value
      };
      this.servicioProveedores.modificar(GrupousuarioModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Usuario modificado con éxito');
            this.ProvedorSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarProveedores(); // Actualizar la lista de usuarios
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

}
