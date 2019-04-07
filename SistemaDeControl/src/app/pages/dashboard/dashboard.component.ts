import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  constructor( public _usuarioService: UsuarioService ) { }
  
  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
