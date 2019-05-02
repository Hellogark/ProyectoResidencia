import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { TareasService } from '../../services/proyectos/tareas.service';
import { Tareas } from '../../models/tareas.model';
import { Proyecto } from '../../models/proyectos.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-mostrar-tarea',
  templateUrl: './mostrar-tarea.component.html',
  styleUrls: ['./mostrar-tarea.component.css']
})
export class MostrarTareaComponent implements OnInit {
  proyecto: Proyecto; 
  tareas: Tareas[] = [];
  @Input() eventoTarea:{};
  dataLista;
  @Output () actualizado = new EventEmitter();
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  nombres: any [] = [];
  nuevosParticipantes = {};
  nuevaTarea:Tareas;
   mostrar: boolean;
  crear: boolean ;
  finalizado:boolean; 

  idProyecto: string;
  datosTarea: Object = {};


  constructor(public _usuarioService: UsuarioService, public _proyectoService:ProyectoService, 
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute) { 
    this.idProyecto = this.rutaActiva.snapshot.paramMap.get('id');
   


   
  }

  ngOnInit() {
    this.dataLista=false;
    this.obtenerTareas();
    this.obtenerProyecto();
    this.nombres =  this._tareasService.nombres;      
    this._tareasService.mostrarTareaObservable.subscribe( (res:any) =>{
    this.mostrar = this._tareasService.mostrar;
    this.crear = this._tareasService.crear;

     });
     this._tareasService.chkTareaObservable.subscribe((res:any) =>{
       console.log(res + "cambió")
      this.finalizado = this._tareasService.finalizado;
     } );
     this.dataLista=true;
  }
  
 
/*   obtenerUsuarios(){
     //Obtener los nombres de los usuarios 
    this._usuarioService.cargarUsuarios(0,this._usuarioService.token)
    .subscribe(res =>{
        this.todosUsuarios = res.usuarios;
        this.todosUsuarios.map( res =>{
        this.nuevosParticipantes  ={
            _id: res._id,
            nombre:res.nombre.toString()          
        }
            this.nombres.push(this.nuevosParticipantes );
        });
        console.log(this.nombres); 
    });
   } */

 
    obtenerTareas(){
      this._tareasService.obtenerTodasTareas(this.idProyecto).subscribe( res =>{
        
        this._tareasService.tareas=res;
        this.tareas = this._tareasService.tareas;
        console.log(this.tareas);
      });
    } 
    obtenerProyecto(){
      this._proyectoService.obtenerProyecto(this.idProyecto).subscribe( res =>{
        console.log(res);
        this.proyecto = res.proyecto;
      });

    }

  mostrarEditar =(mostrar:boolean) => this.mostrar = mostrar;

  editarTarea( tipo:string,tarea:Tareas ){
    if(tipo === 'crear'){
      this.mostrar = true;
      this.crear = true;
      tarea = {};
      this._tareasService.estadoTarea(this.mostrar,this.crear,tarea); 
      
    }
    if(tipo === 'editar'){
      this.crear=false; 
   
      this.mostrar = true;
      this._tareasService.estadoTarea(this.mostrar,this.crear,tarea);
      this._tareasService.enviarFecha(tarea.fechaFinalizado);
      if(tarea.fechaFinalizado === undefined || tarea.fechaFinalizado === null){
        this._tareasService.fecha = '';
      }
     
      console.log(this.mostrar);
      console.log(this._tareasService.fecha);
    }
  }

  crearTarea(){
    this.nuevaTarea = {
      nombreTarea: '',
      descTarea: '',
      creador: this._usuarioService.usuario._id,
      finalizado: false,
      ultimoEditor:this._usuarioService.usuario._id,
      fechaCreacion: moment().locale('es').format('LL'),
      participante: null 

    }
    this._tareasService.crearTarea(this.nuevaTarea,this.idProyecto).subscribe( res =>{
      this.obtenerTareas();
      this._tareasService.obtenerUsuarios();


    });

  }
 
  finalizarTarea(tarea:Tareas){
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
      this._tareasService.tareaChk(res.tarea.finalizado);
      
    }); 
    this.obtenerTareas();
    

    }

 
 


}
