import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo:string;
  public id: string;
  public invisible: string='invisible';
  public notificacion= new EventEmitter<any>();
  constructor() { }
  ocultarModal(){
    this.invisible = 'invisible';
    this.tipo = null;
    this.id = null;
  }
  mostrarModal(tipo:string, id:string){   
    this.invisible = '';
    this.id = id;
    this.tipo = tipo;

  }
}
