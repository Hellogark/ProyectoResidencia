import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import  Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';




declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(public _usuarioService: UsuarioService, public router:Router) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null,Validators.required ),
      correo: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      password2: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      empresa: new FormControl(null,Validators.required),
      condiciones : new FormControl(true)

    }, {validators: this.sonIguales('password','password2')});   
    
}
  

  registrarUsuario(){         
    if(this.forma.invalid){ return;} 
    const FECHA = new Date().toLocaleDateString('es-ES');    
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
      this.forma.value.empresa,
      FECHA,          
    );
    //La resp muestra lo que muestra el postman
    this._usuarioService.crearUsuario(usuario).
    subscribe(resp  =>{     
      this.router.navigate(['/login']);
    });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
    let pass1 = group.controls[campo1].value;
    let pass2 = group.controls[campo2].value;
    if ( pass1 === pass2 )  return null;
    return {sonIguales: true};
    };
  }
}
  
   
