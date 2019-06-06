import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame:boolean = false;
  correo: string;
  constructor( public router: Router, public _usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
     this.correo = localStorage.getItem('correo') || '';
     if(this.correo.length>0){
       this.recuerdame = true;
     }

     if(this._usuarioService.token){
       window.location.assign('/inicio');
     } 
  }

  ingresar(forma:NgForm) {
    if(forma.invalid){return;}

    
    let usuario = new Usuario(null,forma.value.correo,forma.value.password,null,null);
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( resp=>{      
      window.location.assign('/inicio');});
  }

}
