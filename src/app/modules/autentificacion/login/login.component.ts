import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService, private router: Router) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //login es una funcion de usuarioService que nos habilita el menu 
  login() {
    this.usuarioService.login();
    this.router.navigate(['/inicio'])
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { mail, clave } = this.loginForm.value;
      this.usuarioService.inicioSesion(mail, clave).subscribe(response => {
        if (response.success) {
          // Redirect to the desired page
          this.login()
          Swal.fire({
            title: 'Bienvenido',
            text: " Ha ingresado con éxito!",
            icon: "success"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Verifique el usuario y la contraseña",
          });
        }
      });
    }
  }
}