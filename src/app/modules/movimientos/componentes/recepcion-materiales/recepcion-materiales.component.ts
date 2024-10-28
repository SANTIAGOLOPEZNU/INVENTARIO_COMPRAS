import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { InsumosService } from 'src/app/services/insumos.service';


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
  Reciboseleccionado: number=0;

  //------------------Detalles de Movimientos------------------------------
  DetallesRecForm:FormGroup; //formulario para manejar el detalle de los recibos 
  Insumos:any[]=[] //arreglo donde se van a guardar los materiales
  Detalles:any[]=[] //arreglo donde se van a guardar los detalles
  
  constructor(private servicioMovimientos: MovimientosService, private fb: FormBuilder, private ProveedoresService: ProveedoresService, private InsumosService: InsumosService
   ) {
    // Inicializamos el formulario de recepcion de materiales
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

    //formulario para manejar el detalle de los recibos
    this.DetallesRecForm=this.fb.group({
      Cantidad:[0,Validators.required],
      IdInsumosMat:[0,Validators.required],
      // IdRecibo_Recepcion:[0,Validators.required]
    })
  }

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarRecibos();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
    this.recuperarProveedores();
    this.recuperarInsumos();
   
  }

  // Método para recuperar la lista de recibos de la base de datos
  recuperarRecibos() {
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
        console.error('Error al recuperar recibos:', error);
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
        console.error('Error al recuperar recibos:', error);
      }
    });
  }

  // Método para manejar el envío del formulario
  submitForm() {
    // Solo continúa si el formulario es válido
    if (this.recepcionMaterialesForm.valid) {
      const ReciboData = this.recepcionMaterialesForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioMovimientos.alta(ReciboData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Recibo creado con éxito');  //  Se muestra un mensaje de éxito
            this.recepcionMaterialesForm.reset();  // Se resetea el formulario
            this.recuperarRecibos();  // Se actualiza la lista de usuarios
            console.log(ReciboData)
          } else {
            // Si hay un error, se muestra el mensaje recibido del servidor
            alert('Error al crear recibo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          // En caso de error, se muestra un mensaje de error
          alert('Error al crear recibo');
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
      const ReciboModificado = {
        ...this.cabeceraReciboSeleccionado,
        ...this.modificarRecepcionMaterialesForm.value
      };
      this.servicioMovimientos.modificar(ReciboModificado).subscribe({
        next: (response) => {
          if (response && response['resultado'] === 'OK') {
            alert('Recibo modificado con éxito');
            this.cabeceraReciboSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarRecibos(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar recibo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar recibo');
          console.error('Error:', error);
        },
      });
    }
  }

  // Método para seleccionar un usuario y poblar el formulario de modificación
  editarRecepcionMateriales(recibo: any) {
    this.cabeceraReciboSeleccionado = recibo;

    this.Reciboseleccionado = recibo.IdRecibo_Recepcion

    this.recuperarDetalles(this.Reciboseleccionado);

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



//recupera la lista de los detalles de la bd
  recuperarDetalles(recibo: any) {

    console.log('este es el valor del recibo desde recuperardetalles ', recibo)

    this.servicioMovimientos.recuperarDetail(recibo).subscribe({
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
    alert(this.Reciboseleccionado)
    // Solo continúa si el formulario es válido
    if (this.DetallesRecForm.valid) {

      const DetailData = this.DetallesRecForm.value;  // Se obtienen los valores del formulario
      const Recibo = this.Reciboseleccionado
      
      // Se envían los datos al servicio para crear el nuevo usuario
      this.servicioMovimientos.altaDetail(DetailData, Recibo ).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          if (response && response['resultado'] === 'OK') {
            alert('Usuario creado con éxito');  //  Se muestra un mensaje de éxito
            this.DetallesRecForm.reset();  // Se resetea el formulario
            this.recuperarDetalles(this.Reciboseleccionado);  // Se actualiza la lista de usuarios
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
