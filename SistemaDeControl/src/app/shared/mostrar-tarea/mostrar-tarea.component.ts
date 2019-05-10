import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { TareasService } from '../../services/proyectos/tareas.service';
import { Tareas } from '../../models/tareas.model';
import { Proyecto } from '../../models/proyectos.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { Usuario } from '../../models/usuario.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mostrar-tarea',
  templateUrl: './mostrar-tarea.component.html',
  styleUrls: ['./mostrar-tarea.component.css']
})
export class MostrarTareaComponent implements OnInit {
  proyecto: Proyecto; 
  dataLista;
  idTarea;
  @Input() eventoTarea:{};
  @Output () actualizado = new EventEmitter();
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tareas: Tareas[] = [];
  nombres: any [] = [];
  nuevosParticipantes = {};
  mostrar: boolean;
  crear: boolean ;
  finalizado:boolean; 
  cambio:boolean = false;
  eliminar: boolean = false;
  idProyecto: string;
  path: string;
  datosTarea: Object = {};
  progressRef: NgProgressRef;


  constructor(public _usuarioService: UsuarioService, public _proyectoService:ProyectoService, 
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute, private _location:Location,private progress: NgProgress) { 
    this.idProyecto = this.rutaActiva.snapshot.paramMap.get('id');   
          
  }

  ngOnInit() {
    this.dataLista=false;
    this.path = this._location.path().toString();
    this.progressRef = this.progress.ref('progreso');
    this.cargar();
    this.mostrarTipo();    
    this.nombres =  this._tareasService.nombres;      
    this._tareasService.mostrarTareaObservable.subscribe( (res:any) =>{
    this.mostrar = this._tareasService.mostrar;
    this.crear = this._tareasService.crear;
    console.log(this.mostrar);
    });
     if(this._tareasService.subscripcion === undefined){
      this._tareasService.subscripcion = this._tareasService.llamarRecargar.subscribe(  (data:any) =>{
        this.mostrarTipo()
       
      });
     }
     
     
   this.terminado();
     
  }
  ngOnChanges(){
    this.mostrarTipo();
  } 

  obtenerTareas(){
    this._tareasService.obtenerTodasTareas(this.idProyecto).subscribe( res =>{
        
      this._tareasService.tareas=res;
        this.tareas = this._tareasService.tareas;
        this.eliminar = !event;
        this.dataLista=true;
        console.log(this.tareas);
      });
    } 
    obtenerMisTareas(){      
      this._tareasService.obtenerMisTareas(this._usuarioService.usuario._id.toString()).subscribe( res =>{
        this._tareasService.tareas=res.tareas;      
        this.tareas = res.tareas;
        this.dataLista = true;
        console.log(this.tareas);
      });
    }
    obtenerProyecto(){
      this._proyectoService.obtenerProyecto(this.idProyecto).subscribe( res =>{
        console.log(res);
        this.proyecto = res.proyecto;
      });

    }


  editarTarea(tarea:Tareas ){
  
      this.crear=false; 
      this.mostrar = true;
     this.editarTareaF(tarea);
     
      console.log(this.crear);      
 
  }
  nuevaTarea(){
    if(this.mostrar){
      this._tareasService.cerrarTarea();
      console.log('mostrado')
    }
    this.mostrar = true;
    this.crear = true;      
    let tarea = {};
    this._tareasService.estadoTarea(this.mostrar,this.crear,tarea); 
  }

  editarTareaF(tarea:Tareas){
    this.idTarea = tarea._id;        
      this._tareasService.estadoTarea(this.mostrar,this.crear);
      this._tareasService.enviarFecha(tarea.fechaLimite);
      if(tarea.fechaLimite === undefined || tarea.fechaLimite === null){
        this._tareasService.fecha = '';
      }
     

  }


 
  finalizarTarea(tarea:Tareas){
    this.cargar();
    this.finalizado = !tarea.finalizado;
    console.log(this.finalizado);
    this.datosTarea={

     fechaFinalizado: moment().locale('es').format('l'),
     finalizado: this.finalizado,
     ultimoEditor: this._usuarioService.usuario._id

    }
    
    this._tareasService.tarea = tarea;
    this._tareasService.editarChecked(this.datosTarea,tarea._id).subscribe( (res: any) =>{
      console.log(res.tarea.finalizado);
      this.finalizado = res.tarea.finalizado;
      this.terminado();
      this.mostrarTipo();
     
      
    }); 
    
  }
  
  cargar() {
    this.progressRef.start();
  }
  
  terminado() {
    this.progressRef.complete();
  }
  regresar(){
    if (window.history.length > 1) {
      this._location.back();
    }
  }
  cerrarTarea($event){
    console.log($event);
    this.mostrar = false;
    this.crear = false;

  }
  mostrarTipo(){
    if(this.path == '/mistareas'){this.obtenerMisTareas(); this.proyecto = null}else{this.obtenerTareas();this.obtenerProyecto();}        

  }
 
  


}
