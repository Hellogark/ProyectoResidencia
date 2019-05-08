import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

@Pipe({
  name: 'archivo'
})
export class ArchivoPipe implements PipeTransform {
  id: string; 
  transform(archivo: string,id:string ,tipo: string,_usuarioService:UsuarioService  ): any {
  
    //this.id = localStorage.getItem('id');
    if(!id){
      return;
    }
    let url = URL_SERVICIOS + 'descarga';
    if(!archivo){
      return url + '/'+tipo+'/'+id+'/noImagenExistente';
    }
    if ( archivo == undefined || tipo === undefined) {
      return url +  '/'+tipo+'/'+id+'/noImagen';
      }
    
    switch(tipo){
      case tipo:
       url+= '/'+tipo+'/'+id+'/'+archivo;
      break;

      default: 
      console.log('Imagen de usuario no existe');
      url +=  '/'+tipo+'/'+id+'/xxdx';


    }
    return url;
  }

}
