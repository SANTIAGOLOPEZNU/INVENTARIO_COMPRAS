import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { InsumosService } from 'src/app/services/insumos.service';
import { ParametrosService } from 'src/app/services/parametros.service';


@Component({
  selector: 'app-despachos-materiales',
  templateUrl: './despachos-materiales.component.html',
  styleUrls: ['./despachos-materiales.component.css']
})
export class DespachosMaterialesComponent implements OnInit {
  despachosMaterialesForm: FormGroup;  // Formulario reactivo para manejar los datos del recepcion de materiales
  cabeceraDespachos: any[] = [];  // Variable para almacenar las recepciones de materiales de la base de datos
  modificarDespachosMaterialesForm: FormGroup; // Formulario para modificar usuario
  cabeceraDespachoSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  destinatarios: any[] = []; // Arreglo donde se van a guardar los proveedores
  Despachoseleccionado: number=0;

  //------------------Detalles de Movimientos------------------------------
  DetallesRecForm:FormGroup; //formulario para manejar el detalle de los recibos 
  Insumos:any[]=[] //arreglo donde se van a guardar los materiales
  Detalles:any[]=[] //arreglo donde se van a guardar los detalles
  
  constructor(private servicioMovimientos: MovimientosService, private fb: FormBuilder, private ParametrosService:  ParametrosService , private ProveedoresService: ProveedoresService, private InsumosService: InsumosService
   ) {
    // Inicializamos el formulario de recepcion de materiales
    this.despachosMaterialesForm = this.fb.group({
      Fecha: ['', Validators.required],  // Campo obligatorio
      NroRemito: [0, Validators.required],  // Campo obligatorio
      AreaMunicipal: ['', Validators.required], // Campo obligatorio
      Hora: ['', Validators.required], //campo obligatorio
      ResponsableEntrega: ['', Validators.required], //campo obligatorio
      Observaciones: ['', Validators.required], //campo obligatorio
      IdDestinatario: [0, Validators.required]
    });

    // Formulario de modificación de usuarios
    this.modificarDespachosMaterialesForm = this.fb.group({
      Fecha: ['', Validators.required],  // Campo obligatorio
      NroRemito: [0, Validators.required],  // Campo obligatorio
      AreaMunicipal: ['', Validators.required], // Campo obligatorio
      Hora: ['', Validators.required], //campo obligatorio
      ResponsableEntrega: ['', Validators.required], //campo obligatorio
      Observaciones: ['', Validators.required], //campo obligatorio
      IdDestinatario: [0, Validators.required]
    });

    //formulario para manejar el detalle de los recibos
    this.DetallesRecForm=this.fb.group({
      Cantidad:[0,Validators.required],
      IdInsumosMat:[0,Validators.required],
      // IdRecibo_Recepcion:[0,Validators.required]
    })
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarDespachos();  // Al iniciar el componente, se recuperan los  de la base de datos
    this.recuperarDestinatarios();
    this.recuperarInsumos();
   
  }

  // Método para recuperar la lista de recibos de la base de datos
  recuperarDespachos() {
    this.servicioMovimientos.recuperarDespachos().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.cabeceraDespachos = response; // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.cabeceraDespachos = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar despachos:', error);
      }
    });
  }

  //Metodo para mostrar a lista de grupos/usuarios de la base de datos
  recuperarDestinatarios() {
    this.ParametrosService.recuperar().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.destinatarios = response;  // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.destinatarios = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar destinatarios:', error);
      }
    });
  }

  // Método para manejar el envío del formulario
  submitForm() {
    // Solo continúa si el formulario es válido
    if (this.despachosMaterialesForm.valid) {
      const DespachoData = this.despachosMaterialesForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioMovimientos.altaDespacho(DespachoData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Recibo creado con éxito');  //  Se muestra un mensaje de éxito
            this.despachosMaterialesForm.reset();  // Se resetea el formulario
            this.recuperarDespachos();  // Se actualiza la lista de usuarios
            console.log(DespachoData)
          } else {
            // Si hay un error, se muestra el mensaje recibido del servidor
            alert('Error al crear despacho: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          // En caso de error, se muestra un mensaje de error
          alert('Error al crear despacho');
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
    if (this.modificarDespachosMaterialesForm.valid) {
      const DespachoModificado = {
        ...this.cabeceraDespachoSeleccionado,
        ...this.modificarDespachosMaterialesForm.value
      };
      this.servicioMovimientos.modificar(DespachoModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Despacho modificado con éxito');
            this.cabeceraDespachoSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarDespachos(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar despacho: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar despacho');
          console.error('Error:', error);
        },
      });
    }
  }

  // Método para seleccionar un usuario y poblar el formulario de modificación
  editarDespachoMateriales(despacho: any) {
    this.cabeceraDespachoSeleccionado = despacho;

    this.Despachoseleccionado = despacho.Id_Despacho

    this.recuperarDetalles(this.Despachoseleccionado);

    this.modificarDespachosMaterialesForm.patchValue({
      Fecha: despacho.Fecha,
      NroRemito: despacho.Nro_Remito_Despacho,
      AreaMunicipal: despacho.Area_Municipal,
      Hora: despacho.Hora,
      ResponsableEntrega: despacho.Responsable_Entrega,
      Observaciones: despacho.Observaciones,
      IdDestinatario: despacho.Id_Destinatario
    });

  }



//recupera la lista de los detalles de la bd
  recuperarDetalles(despacho: any) {

    console.log('este es el valor del recibo desde recuperardetalles ', despacho)

    this.servicioMovimientos.recuperarDetail(despacho).subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.Detalles = response; // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.Detalles = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar detalles:', error);
      }
    });

    }



  
  // Método para manejar el envío del formulario
  submitDetailForm() {
    alert(this.Despachoseleccionado)
    // Solo continúa si el formulario es válido
    if (this.DetallesRecForm.valid) {

      const DetailData = this.DetallesRecForm.value;  // Se obtienen los valores del formulario
      const Despacho = this.Despachoseleccionado
      
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioMovimientos.altaDetail(DetailData, Despacho ).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Despacho agregado con éxito');  //  Se muestra un mensaje de éxito
            this.DetallesRecForm.reset();  // Se resetea el formulario
            this.recuperarDetalles(this.Despachoseleccionado);  // Se actualiza la lista de usuarios
          } else {
            // Si hay un error, se muestra el mensaje recibido del servidor
            alert('Error al añadir detalle: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          // En caso de error, se muestra un mensaje de error
          alert('Error al añadir detalle');
          console.error('Error:', error);  // Se registra el error en la consola
        },
      });
    } else {
      // Si el formulario no es válido, se muestra un mensaje al usuario
      alert('Por favor, completa todos los campos correctamente');
    }
  }


  recuperarInsumos() {
    this.InsumosService.recuperar().subscribe({
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
}
