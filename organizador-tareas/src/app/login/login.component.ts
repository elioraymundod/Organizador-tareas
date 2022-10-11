import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../Servicios/LoginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datosFormGroup: FormGroup;
  crearUsuario: FormGroup;
  public userValid: boolean;
  date: Date;

  constructor(private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private datePipe: DatePipe) {
    this.userValid = false;

    this.datosFormGroup = this._formBuilder.group({
      loginFormControl: ['', [Validators.required]],
      passFormControl: ['', [Validators.required]]
    });

    this.crearUsuario = this._formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });

    this.date = new Date();
  }

  ngOnInit(): void {

  }

  async iniciarSesion(datos: any) {
    await this.loginService.getUserByLoginAndPass(datos.loginFormControl, datos.passFormControl).subscribe(res => {
      if (res.length > 0) {
        this.loginService.idUser = res[0].ID
        this.loginService.userValid = true;
        this.loginService.nombreUsuario = res[0].NOMBRE;
        this.router.navigate(['tablero-principal']);
      } else {
        this.loginService.userValid = false;
        Swal.fire({
          title: 'Usuario y/o contraseña incorrectos',
          icon: 'error'
        });
      }
    }, err => {
      console.error(err)
    })
  }

  limpiarForms(){
    this.crearUsuario.reset();
  }

  guardarUsuario(data: any){
    const usuario = {
      NOMBRE: data.nombreUsuario,
      EMAIL: data.correo,
      USUARIO: data.usuario,
      PASS: data.pass,
      FECHA_CREACION: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      USUARIO_CREACION: 'admin'
    }
    this.loginService.insertUsuario(usuario).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado con exito, ahora intenta iniciar sesión para poder organizar tus tareas.'
      })
      this.crearUsuario.reset();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error, por favor intente mas tarde'
      })
      this.crearUsuario.reset();
    })
  }
}
