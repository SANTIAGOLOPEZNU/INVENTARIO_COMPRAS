import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuariosService) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  //login es una funcion de usuarioService que nos habilita el menu 
  login() {
    this.usuarioService.login();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { mail, clave } = this.loginForm.value;
      this.usuarioService.inicioSesion(mail, clave).subscribe(response => {
        console.log('Server Response:', response);
        if (response.success) {
          // Redirect to the desired page
          console.log('Login successful');
        } else {
          this.loginError = 'Invalid email or password';
        }
      });
    }
  }
}