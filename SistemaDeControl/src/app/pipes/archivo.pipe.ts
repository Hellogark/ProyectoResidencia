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
      let img = '../assets/images/no-img.png';
    if(!id){
      return;
    }
    let url = "https://res.cloudinary.com/dinamycstest/image/upload";
    if(!archivo){
      return img;
    }
    if ( archivo == undefined || tipo === undefined) {
      return img;
      }
      if( archivo == ""){
        return img;
      }
    
    switch(tipo){
      case tipo:
       url+= '/'+tipo+'/'+id+'/'+archivo;
      break;

      default: 
      
      url +=  '/'+tipo+'/'+id+'/xxdx';
    }
    return url;
  }

}
