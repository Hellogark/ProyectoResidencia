import { Component, HostListener } from '@angular/core';

import { SettingsService } from './services/service.index';
import {UsuarioService } from './services/usuario/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public _ajustes: SettingsService, public _usuarioService: UsuarioService ) {
    
  }


}
