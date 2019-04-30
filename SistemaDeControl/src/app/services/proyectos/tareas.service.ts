import { Tareas } from './../../models/tareas.model';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject} from 'rxjs';
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
  tarea: Tareas;
  tareas: Tareas[];
  fecha: any;
  mostrar:boolean;
  crear:boolean;
  finalizado: boolean;
  private mostrarTareaSubject = new BehaviorSubject<any>(null);
  mostrarTareaObservable = this.mostrarTareaSubject.asObservable(); 
  private enviarFechaSubject = new BehaviorSubject <any>(null);
  enviarFechaObservable = this.enviarFechaSubject.asObservable();
 
  token =this._usuarioService.token;


  constructor(public _usuarioService:UsuarioService, public http: HttpClient,public  router: Router) { 

  }
  crearTarea(tarea:Tareas, id:string){
    let url = URL_SERVICIOS +'tareas/'+ id+'/crear?token='+this.token;
       return this.http.post(url,tarea).pipe(map((res:any) =>{
        console.log(res);
      } ));

  }

  obtenerTodasTareas(id:string ){
    let url = URL_SERVICIOS +'tareas/'+id+'/tareas?token='+this.token;
    return this.http.get(url).pipe( map((res:any)=>{
     
       res.proyectos.forEach(element => {
        this.proyecto = element;
      });
      
      this.tareas = this.proyecto.tareas;
      return this.tareas;
    } ) );
  }

  editarChecked(datosTarea:Object,idTarea:string){
    let url = URL_SERVICIOS + 'tareas/tareaTerminada/'+idTarea+'?token='+this.token;
    return this.http.put(url,datosTarea).pipe( map( (res:any)=>{
        console.log(res);
    }));
  }

  editarTarea(tarea:Tareas,idProyecto:string){
    let url = URL_SERVICIOS + 'tareas/'+idProyecto+'/actualizar/'+tarea._id+'?token='+this.token;


  }
    estadoTarea(mostrarT:boolean, crearT?:boolean,tarea?:Tareas){
      this.mostrar = mostrarT;
      this.mostrarTareaSubject.next(mostrarT);
      this.crear = crearT;
      this.mostrarTareaSubject.next(crearT);
      this.tarea = tarea;
      this.mostrarTareaSubject.next(tarea);
    }

    enviarFecha(fecha: any){
      this.fecha = fecha;
      this.enviarFechaSubject.next(fecha);

    }
}
