import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2'
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame:boolean = false;
  correo: string;
  logueando: boolean = false;
  constructor( public router: Router, public _usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
     this.correo = localStorage.getItem('correo') || '';
     if(this.correo.length>0){
       this.recuerdame = true;
     }

     if(this._usuarioService.token){
      this.router.navigate(['/inicio']);
     } 
  }

  ingresar(forma:NgForm) {
    
    
    if(forma.invalid){return;}
    
    this.logueando = true;
    
    let usuario = new Usuario(null,forma.value.correo,forma.value.password,null,null);
     
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( resp=>{
      
      this.router.navigate(['/inicio']);
    },(err)=>{
      this.logueando = false;     
      Swal.fire({
        title: 'El servicio no está disponible, intenta de nuevo más tarde',
        type: 'error',
        toast: true,
        timer: 3500
        
        
      });
    });
  
 
  }

}
