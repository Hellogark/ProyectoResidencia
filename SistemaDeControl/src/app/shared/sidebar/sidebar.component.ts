import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],

})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor( public _sidebar: SidebarService ,public _usuarioService:UsuarioService,
    public _modalUploadService:ModalUploadService, public _sidebarService:SidebarService,
    ) { 
   
    }

  ngOnInit() {
     this.usuario = this._usuarioService.usuario; 
     this._sidebarService.cargarMenu();
     this._modalUploadService.notificacion.subscribe(res => {

      if(this._usuarioService.usuario._id === res.usuario._id){           
          this.usuario=this._usuarioService.usuario;
        }
        
      });

  }

}
