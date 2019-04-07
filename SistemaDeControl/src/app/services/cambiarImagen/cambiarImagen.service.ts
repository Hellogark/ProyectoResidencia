import { Archivos } from './../../models/archivos.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CambiarImagenService {

  constructor() { }

  subirImagen(archivo:File, tipo:string, id:string,token:string){
    let url = URL_SERVICIOS + 'upload/' + tipo + '/'+id ;
    url+='?token='+token;
    return new Promise( (resolve, reject) =>{
      let formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('img',archivo,archivo.name);
      xhr.onreadystatechange = function(){
        if(xhr.readyState ===4){
          if(xhr.status === 200){
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('Falló la subida de la iamgen');
            reject(JSON.parse(xhr.response));
          }

        }
      };
      
      xhr.open('PUT', url,true);
      xhr.send(formData);
    });
  }

  subirArchivo(archivoObj:Archivos,archivo:File, id:string,token:string){
    let url = URL_SERVICIOS + 'proyectos/'+id+'/archivos?token='+token;
    
    return new Promise( (resolve, reject) =>{
      let formData: FormData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('archivos',archivo,archivo.name);
      
      formData.append('archivoObj',JSON.stringify(archivoObj));
    
      console.log(JSON.stringify(archivoObj));
     
      xhr.onreadystatechange = function(){
        if(xhr.readyState ===4){
          if(xhr.status === 200){
            console.log('archivo subido');
            resolve(JSON.parse(xhr.response));
          }else{
            if(xhr.status === 409){
              Swal.fire({
                title: 'El archivo con ese nombre ya existe, intente con uno nuevo o renombre el archivo a subir',
                type: 'error'
    
                });
            console.log('Falló la subida del archivo');
            //reject();
            }
         
            
          }
        }else{
          
        }
      };
     
      
      xhr.open('PUT', url,true);
      xhr.send(formData);
    });
  }
}
