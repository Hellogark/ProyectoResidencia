import { Router } from '@angular/router';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
    usuario: Usuario;
    role: string;
  constructor (public _usuarioService:UsuarioService, public _modalUploadService:ModalUploadService,
    public router:Router
    ) { }

  ngOnInit() {
    //Usar la data del usuario donde se ocupe
    this.usuario = this._usuarioService.usuario;    
    this.role = this.usuario.role;
    this._modalUploadService.notificacion.subscribe(res => {

      if(this._usuarioService.usuario._id === res.usuario._id){           
          this.usuario=this._usuarioService.usuario;
        }
        
      });
  
    
  }
  buscar(termino: string){
    this.router.navigate(['/busqueda',termino]);
  }

}
