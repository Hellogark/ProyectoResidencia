import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {
  menu: any =[];
ñ
  constructor(public _usuarioService: UsuarioService) { 

  }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }

}
