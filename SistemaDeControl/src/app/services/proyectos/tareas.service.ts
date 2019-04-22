import { Tareas } from './../../models/tareas.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Archivos } from './../../models/archivos.model';
import { URL_SERVICIOS } from './../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from 'sweetalert2';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class TareasService {

  proyecto: Proyecto;
  usuario: Usuario; 
 
  token =this._usuarioService.token;


  constructor(public _usuarioService:UsuarioService, public http: HttpClient,public  router: Router) { 

  }
  crearTarea(tarea:Tareas[], id:string){
    let url = URL_SERVICIOS +'proyectos/'+ id+'/tareas?token='+this.token;
       return this.http.post(url,tarea).pipe(map((res:any) =>{
        console.log(res);
      } ));

  }

  obtenerTodasTareas(id:string ){
    let url = URL_SERVICIOS +'proyectos/'+id+'/tareas?token='+this.token;
    return this.http.get(url).pipe( map((res:any)=>{
      console.log(res);
      return res;
    } ) );
  }

}
