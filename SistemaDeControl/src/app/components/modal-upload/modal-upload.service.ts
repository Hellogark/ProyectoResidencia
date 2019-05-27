import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public id: string;
  public invisible: boolean = false;
  public usuario:Usuario;
  public notificacion= new EventEmitter<any>();
  constructor() { }
  ocultarModal(){
    this.invisible = false;
    this.id = null;
    this.usuario = null;
  }
  mostrarModal(usuario:Usuario){   
    this.invisible = true;
    this.id = usuario._id;
    this.usuario = usuario;

  }
}
