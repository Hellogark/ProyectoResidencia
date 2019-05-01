import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProyectoService, UsuarioService, TareasService } from 'src/app/services/service.index';
import { TagInputModule } from 'ngx-chips';
import  Swal from 'sweetalert2';
import { Tareas } from '../../models/tareas.model';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {
  @Input() fecha: any;
  asignado:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tarea:Tareas;
  nuevosParticipantes  = {};
  participante:any; 
  arregloParticipante:any [] = [];
  @Input() nombres: any [] = [];
  @Input() proyecto: Proyecto;
  @Input() dataLista;
  @Output() editar = new EventEmitter();
  datos: boolean = false;
  crear:boolean;
  mostrar:boolean; 
  finalizado:boolean; 
  descripcion: string;
  datosTarea: Object = {};

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
    
    public _tareasService:TareasService ) {
  
    
    }
    ngOnInit(){          
      this.datos = false;
      if(this.crear){        
        this.tarea = {
          proyecto: this.proyecto._id,
          nombreTarea: '',
          descTarea: '',
          creador: '',
          finalizado: false,
          ultimoEditor: '',
          fechaCreacion: '',
          fechaFinalizado: '',
          participante: null,
  
  
        };   
        this.datos = true;    
      }
      this._tareasService.mostrarTareaObservable.subscribe( res =>{
        this.tarea = {};
        this.arregloParticipante = [];
        this.fecha = '';
        this.mostrar = this._tareasService.mostrar;
        this.crear = this._tareasService.crear;
        this.tarea = this._tareasService.tarea;
        
        if(this.tarea.participante != null){
          if(this.arregloParticipante.length >=0 && this.arregloParticipante.length <1){
            this.arregloParticipante = [];
            this.participante = Object.values(this.tarea.participante);              
            this.arregloParticipante.push(this.participante[5]);

          }
        }
        
      });
      this._tareasService.enviarFechaObservable.subscribe( res =>{
        this.fecha = '';
        this.fecha = res;
        console.log(this.fecha);
      });

      
      
      
      //Se itera el objeto del participante para extraer después el nombre
      console.log("crear"+this.crear);
      console.log(this.tarea);
      this.datos = true;
      
    }
 
  
  ngOnDestroy(){
    console.log('Destroy');
   
  }

    crearEditarTarea(tarea:Tareas){
        this.tarea.proyecto = tarea.proyecto;
        this.tarea.nombreTarea = tarea.nombreTarea;
        this.tarea.descTarea = tarea.descTarea;
        this.tarea.creador = this._usuarioService.usuario._id;
        this.tarea.fechaLimite = this.fecha;
        this.tarea.ultimoEditor = this._usuarioService.usuario._id;
        this.tarea.participante = tarea.participante;
        console.log(this.tarea.participante);



       
        if(this.crear){
          this._tareasService.crearTarea(this.tarea,this.proyecto._id).subscribe( res =>{
            console.log(res);
          });

        }else{


        }
      

    }
    finalizarTarea(){
      this.finalizado != this.tarea.finalizado;
      this.datosTarea={
       fechaFinalizado: moment().locale('es').format('L'),
       finalizado: this.finalizado,
       ultimoEditor: this._usuarioService.usuario._id
      }
      if(!this.finalizado){
        this.datosTarea={
          fechaFinalizado: '',
          finalizado: this.finalizado,
          ultimoEditor: this._usuarioService.usuario._id
         }
         this._tareasService.editarChecked(this.datosTarea,this.tarea._id).subscribe(res =>{
          this._tareasService.tareaChk(this.finalizado);
        });
      }
      this._tareasService.editarChecked(this.datosTarea,this.tarea._id).subscribe(res =>{
        this._tareasService.tareaChk(this.finalizado);
      });

      }
    
    obtenerFecha = (fecha) =>this.fecha = fecha;

  cerrarTarea(){
    this.mostrar = false;
    this.crear = false;
    this.tarea={};
    this._tareasService.estadoTarea(this.mostrar,this.crear,this.tarea );
    this.editar.emit(this.mostrar);
  }
  ngOnChange(){
    console.log(this.tarea.fechaLimite);
  }


}
