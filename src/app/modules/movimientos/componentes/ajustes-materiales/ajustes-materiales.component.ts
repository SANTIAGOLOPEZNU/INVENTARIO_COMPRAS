import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { InsumosService } from 'src/app/services/insumos.service';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-ajustes-materiales',
  templateUrl: './ajustes-materiales.component.html',
  styleUrls: ['./ajustes-materiales.component.css']
})
export class AjustesMaterialesComponent {
  ajustesMaterialesForm: FormGroup;  // Formulario reactivo para manejar los datos del recepcion de materiales
  cabeceraAjustes: any[] = [];  // Variable para almacenar las recepciones de materiales de la base de datos
  modificarAjustesMaterialesForm: FormGroup; // Formulario para modificar usuario
  cabeceraAjusteSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  Ajusteseleccionado: number=0;

 //------------------Detalles de Movimientos------------------------------
 DetallesRecForm:FormGroup; //formulario para manejar el detalle de los recibos 
 Insumos:any[]=[] //arreglo donde se van a guardar los materiales
 Detalles:any[]=[] //arreglo donde se van a guardar los detalles
 
 constructor(private servicioMovimientos: MovimientosService, private fb: FormBuilder, private ParametrosService:  ParametrosService , private ProveedoresService: ProveedoresService, private InsumosService: InsumosService
  ) {
   // Inicializamos el formulario de recepcion de materiales
   this.ajustesMaterialesForm = this.fb.group({
     Fecha: ['', Validators.required],  // Campo obligatorio
     Hora: ['', Validators.required], //campo obligatorio
     Responsable: ['', Validators.required], //campo obligatorio
     Observacion: ['', Validators.required], //campo obligatorio
   });

   // Formulario de modificación de usuarios
   this.modificarAjustesMaterialesForm = this.fb.group({
     Fecha: ['', Validators.required],  // Campo obligatorio   
     Hora: ['', Validators.required], //campo obligatorio
     Responsable: ['', Validators.required], //campo obligatorio
     Observacion: ['', Validators.required], //campo obligatorio
   });

   //formulario para manejar el detalle de los recibos
   this.DetallesRecForm=this.fb.group({
     Cantidad:['',[Validators.required, Validators.max(-1)]],
     IdInsumosMat:['',Validators.required],
    
   })
 }

 // Este método se ejecuta cuando el componente se inicializa
 ngOnInit(): void {
  this.recuperarAjustes();  // Al iniciar el componente, se recuperan los  de la base de datos
  this.recuperarInsumos();
 
}

// Método para recuperar la lista de recibos de la base de datos
recuperarAjustes() {
  this.servicioMovimientos.recuperarAjuste().subscribe({
    next: (response) => {
      // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
      if (Array.isArray(response)) {
        this.cabeceraAjustes = response; // Asigna los usuarios recibidos
      } else {
        console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
        this.cabeceraAjustes = [];  // Si la respuesta no es válida, se asigna un array vacío
      }
    },
    error: (error) => {
      // En caso de error al recuperar los usuarios, se registra en la consola
      console.error('Error al recuperar despachos:', error);
    }
  });
}



// Método para manejar el envío del formulario
submitForm() {
  // Solo continúa si el formulario es válido
  if (this.ajustesMaterialesForm.valid) {
    const AjusteData = this.ajustesMaterialesForm.value;  // Se obtienen los valores del formulario
    console.log(AjusteData)
    // Se envían los datos al servicio para crear el nuevo usuario
    this.servicioMovimientos.altaAJuste(AjusteData).subscribe({
      next: (response) => {
        // Si la respuesta es correcta y el servidor indica que el usuario fue creado
        if (response && response['resultado'] === 'OK') {
          alert('Recibo creado con éxito');  //  Se muestra un mensaje de éxito
          this.ajustesMaterialesForm.reset();  // Se resetea el formulario
          this.recuperarAjustes();  // Se actualiza la lista de usuarios
          console.log(AjusteData)
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
  if (this.modificarAjustesMaterialesForm.valid) {
    const AjusteModificado = {
      ...this.cabeceraAjusteSeleccionado,
      ...this.modificarAjustesMaterialesForm.value
    };
    this.servicioMovimientos.modificarAjuste(AjusteModificado).subscribe({
      next: (response) => {
        if (response && response['resultado'] === 'OK') {
          alert('Despacho modificado con éxito');
          this.cabeceraAjusteSeleccionado = null; // Ocultar el formulario después de modificar
          this.recuperarAjustes(); // Actualizar la lista de usuarios
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
editarAjusteMateriales(ajuste: any) {
  this.cabeceraAjusteSeleccionado = ajuste;

  this.Ajusteseleccionado = ajuste.Id_Ajuste

  this.recuperarDetalles(this.Ajusteseleccionado);

  this.modificarAjustesMaterialesForm.patchValue({
    Fecha: ajuste.Fecha,
    Hora: ajuste.Hora,
    Responsable: ajuste.Responsable,
    Observaciones: ajuste.Observacion
  });

}



//recupera la lista de los detalles de la bd
recuperarDetalles(despacho: any) {

  console.log('este es el valor del recibo desde recuperardetalles ', despacho)

  this.servicioMovimientos.RecuperarDetailDespacho(despacho).subscribe({
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
  alert(this.Ajusteseleccionado)
  // Solo continúa si el formulario es válido
  if (this.DetallesRecForm.valid) {

    const DetailData = this.DetallesRecForm.value;  // Se obtienen los valores del formulario
    const ajuste = this.Ajusteseleccionado
    
    // Se envían los datos al servicio para crear el nuevo usuario
    this.servicioMovimientos.altaDetallesDespacho(DetailData,ajuste ).subscribe({
      next: (response) => {
        // Si la respuesta es correcta y el servidor indica que el usuario fue creado
        if (response && response['resultado'] === 'OK') {
          alert('Despacho agregado con éxito');  //  Se muestra un mensaje de éxito
          this.DetallesRecForm.reset();  // Se resetea el formulario
          this.recuperarDetalles(this.Ajusteseleccionado);  // Se actualiza la lista de usuarios
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
