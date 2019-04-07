import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';



import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-select-usuarios',
  templateUrl: './select-usuarios.component.html',
  styleUrls: ['./select-usuarios.component.css']
})
export class SelectUsuariosComponent implements OnInit {

  constructor(public _usuarioService:UsuarioService) { }
  usuarios:Usuario[];
  desde: number = 0;
  ngOnInit() {
  }

  cargarUsuario(){
     
    this._usuarioService.cargarUsuarios(this.desde,this._usuarioService.token)
    .subscribe( (res:any) =>{  
      this.usuarios = res.usuarios;     
            
    });
  }

}
