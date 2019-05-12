import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo:string;
  public id: string;
  public invisible: boolean = false;
  public usuario:Usuario;
  public notificacion= new EventEmitter<any>();
  constructor() { }
  ocultarModal(){
    this.invisible = false;
    this.tipo = null;
    this.id = null;
    this.usuario = null;
  }
  mostrarModal(tipo:string, usuario:Usuario){   
    this.invisible = true;
    this.id = usuario._id;
    this.tipo = tipo;
    this.usuario = usuario;

  }
}
