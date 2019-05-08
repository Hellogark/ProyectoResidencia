import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Tareas } from './../../models/tareas.model';

import { map} from 'rxjs/operators';
import { Router } from '@angular/router';
import {  BehaviorSubject, Subscription} from 'rxjs';

import { URL_SERVICIOS } from './../../config/config';
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
  todosUsuarios:Usuario[] = [];
  nombres: any [] = [];
  nuevosParticipantes = {};
  fecha: any;
  mostrar:boolean;
  crear:boolean;
  finalizado: boolean;
  eliminar:boolean;
 
  private mostrarTareaSubject = new BehaviorSubject<any>(null);
  mostrarTareaObservable = this.mostrarTareaSubject.asObservable(); 
  private enviarFechaSubject = new BehaviorSubject <string>('');
  enviarFechaObservable = this.enviarFechaSubject.asObservable();
  llamarRecargar = new EventEmitter<any>();
  subscripcion: Subscription;
  
 
  token =this._usuarioService.token;


  constructor(public _usuarioService:UsuarioService, public http: HttpClient,public  router: Router) { 

  }
  crearTarea(tarea:Tareas, id:string){
    let url = URL_SERVICIOS +'tareas/'+ id+'/crear?token='+this.token;
       return this.http.post(url,tarea).pipe(map((res:any) =>{
        Swal.fire({
          title: 'Tarea creada correctamente',
          type: 'success',
          timer: 3500,
          toast:true
        })
      }));

  }

  obtenerTodasTareas(id:string ){
    let url = URL_SERVICIOS +'tareas/'+id+'/tareas?token='+this.token;
    return this.http.get(url).pipe( map((res:any)=>{
     
       res.proyectos.forEach(element => {
        this.proyecto = element;
      });
      
      this.tareas = this.proyecto.tareas;
      this.obtenerUsuarios();
      return this.tareas;
    } ) );
  }

  obtenerMisTareas(id:string){
    let url = URL_SERVICIOS +'tareas/'+id+'/mistareas?token='+this.token;
    return this.http.get(url).pipe( map( (res:any) =>{
      console.log(res);
      return res;
      
    }));

  }
  obtenerTarea(id:string){
    let url = URL_SERVICIOS + 'tareas/tareaEditar/'+id+'?token='+this.token;
    return this.http.get(url).pipe(map((res:any) =>{     
      return res;
    } ));

  }
  editarChecked(datosTarea:Object,idTarea:string){
    let url = URL_SERVICIOS + 'tareas/tareaTerminada/'+idTarea+'?token='+this.token;
    return this.http.put(url,datosTarea).pipe( map( (res:any)=>{
        return res;
    }));
  }

  editarTarea(tarea:Tareas,idProyecto:string){
    let url = URL_SERVICIOS + 'tareas/'+idProyecto+'/actualizar/'+tarea._id+'?token='+this.token;
    return this.http.put(url,tarea).pipe( map(  (res:any) =>{
      Swal.fire({
        title: 'Tarea editada correctamente',
        type: 'success',
        timer: 3500,
        toast:true
      })
      return res;

    }));


  }
  eliminarTarea(idProyecto:string,idTarea:string){
    let url = URL_SERVICIOS + 'tareas/'+idProyecto+'/eliminarTarea/'+idTarea;
    url+='?token='+this.token;
    return this.http.delete(url).pipe( map( (res:any) =>{
     Swal.fire({
       title: 'Tarea eliminada',
       type: 'success',
       timer: 3500,
       toast:true
     })
      return res;
    }));
  }
    estadoTarea(mostrarT:boolean, crearT?:boolean,tarea?:Tareas){
      this.mostrar = mostrarT;
      this.mostrarTareaSubject.next(mostrarT);
      this.crear = crearT;
      this.mostrarTareaSubject.next(crearT);
      this.tarea = tarea;
      this.mostrarTareaSubject.next(tarea);
    }

    enviarFecha(fecha: string){
      this.fecha = fecha;
      this.enviarFechaSubject.next(fecha);

    }
    
     
  obtenerUsuarios(){
    this._usuarioService.cargarUsuarios(0,this._usuarioService.token)
    .subscribe(res =>{
      this.nombres = [];
        this.todosUsuarios = res.usuarios;
        this.todosUsuarios.map( res =>{
        this.nuevosParticipantes  ={
            _id: res._id,
            nombre:res.nombre.toString()          
        }
            this.nombres.push(this.nuevosParticipantes );
        });        
    });
   }
   recargarTarea(){ this.llamarRecargar.emit();}
}
