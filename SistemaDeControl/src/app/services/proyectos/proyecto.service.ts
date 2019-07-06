import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Archivos } from './../../models/archivos.model';
import { URL_SERVICIOS } from './../../config/config';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import { map, catchError,debounceTime } from 'rxjs/operators';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyecto: Proyecto;
  usuario: Usuario; 
 
  token =this._usuarioService.token;

  constructor(public http: HttpClient,public _usuarioService:UsuarioService,public  router: Router) { }
  crearProyecto(proyecto:Proyecto, id){
    let url = URL_SERVICIOS + 'proyectos/'+id;
    url+= '?token='+this.token;

    return this.http.post(url,proyecto).pipe(map((res:any)=>{     
      Swal.fire({
        title: 'Proyecto creado con éxito',      
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(result =>{
        this.router.navigate(['/ver-proyectos']);
      });
    }));

  }

  obtenerProyecto(id:string){
    
    let url = URL_SERVICIOS + 'proyectos/id/'+id;
   return this.http.get(url).pipe(map((res:any)=>{     
    return res;

   }));
  }
  

  cargarProyectos(){
    let url = URL_SERVICIOS + 'proyectos';
    url+= '?token='+this.token;
   return this.http.get(url).pipe(map((res:any)=>{     
    return res;

   }));
  }

  eliminarProyecto(id:string){
    let url= URL_SERVICIOS + 'proyectos/'+id+'?token='+this.token;
    return this.http.delete(url).pipe(map((res:any)=>{
      Swal.fire({
        title:'Proyecto eliminado con éxito',
        type:'success'

      }
      )
    }));
  }

  buscarProyectos(termino: string){
    let url = URL_SERVICIOS + 'busqueda/info/proyectos/'+termino+'?token='+this.token;
    return this.http.get(url).pipe(debounceTime(2500),map((res:any)=>{
      return res.proyectos;
    }));

  }

  editarProyecto(proyecto:Proyecto){
    
    let url = URL_SERVICIOS + 'proyectos/editarProyecto/'+proyecto._id+'?token='+this.token;
    return this.http.put(url,proyecto).pipe( map( (res:any) => {
      Swal.fire({
        title: 'Proyecto actualizado con éxito',
        type: 'success'       
      });
      
      return res;
    }));

  }

  
  misProyectos(id: string){
    let url = URL_SERVICIOS + 'proyectos/misproyectos/'+id;
    url+= '?token='+this.token;
    return this.http.get(url).pipe( map((res:any) => {
      return res;
    } ));
  }

  subirArchivo(datosArchivo:Archivos,archivo:File,proyecto:Proyecto){
   
    let formData: FormData = new FormData();
    formData.append('archivos',archivo,archivo.name);      
    formData.append('datosArchivo',JSON.stringify(datosArchivo));
  

    let url = URL_SERVICIOS + 'proyectos/'+proyecto._id+'/archivos?token='+this.token;
    return this.http.put(url,formData,{reportProgress:true}).pipe( map( (res:any) => {
     
       Swal.fire({
        title: res.mensaje,       
        type: 'success',        
        timer: 3500


      });  
    }),catchError((err) =>{
     
      return Swal.fire({
        title: err.error.errors.message,       
        type: 'error',        
        timer: 3500


      });
       //throwError(err);
    } ));  
  }

  descargarArchivo(id:string, nombreArchivo:string){
    let url = URL_SERVICIOS + 'proyectos/'+id+'/descargar/'+nombreArchivo+'?token='+this.token;
 
    return this.http.get(url,{responseType: 'blob'}).pipe( map( (res:any) =>{      
      return res;
    } ),catchError((err:any) =>{
      return  Swal.fire({
        title: 'Ah ocurrido un error al descargar el archivo, el archivo no existe o no se encuentra disponible',       
        type: 'error',        
        timer: 3500
      });
    } ));  

  }

  eliminarArchivo(archivo:Archivos,proyecto:Proyecto){
    let url = URL_SERVICIOS + 'proyectos/'+proyecto._id+'/archivo/'+archivo._id+'?token='+this.token;



const options = { 
    headers: new HttpHeaders({'Content-Type': 'application/json',}),
    body:{archivo: archivo}};
    return this.http.delete(url,options).pipe ( map ( (res:any) =>{
      Swal.fire({
        title:'Archivo eliminado con éxito',
        type:'success'

      }
      )
    }));
  }

  
}
