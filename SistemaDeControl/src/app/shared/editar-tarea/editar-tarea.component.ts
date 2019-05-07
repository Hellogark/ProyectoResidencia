import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProyectoService, UsuarioService, TareasService } from 'src/app/services/service.index';
import { TagInputModule } from 'ngx-chips';
import  Swal from 'sweetalert2';
import { Tareas } from '../../models/tareas.model';
import * as moment from 'moment';
import { Location } from '@angular/common';

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
  nombres: any [] = [];
  idProyecto: string;
  @Input() proyecto: Proyecto;
  @Input() idTarea;
  @Input() dataLista;
  @Input() cambio = false;
  @Output() editar = new EventEmitter();
  eliminar: boolean =  false;
  datos: boolean = false;
  crear:boolean;
  @Input() mostrar:boolean; 
  descripcion: string;
  datosTarea: Object = {};

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
    
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute ) {
      this.idProyecto = this.rutaActiva.snapshot.paramMap.get('id');

  
    
    }
  ngOnInit(){          
    this._tareasService.mostrarTareaObservable.subscribe( res =>{ 

      this.obtenerTarea();

    

    });
      
    }
    ngOnChanges(){
      this.datos = false;         
      this.obtenerTarea();       
      
    }
  
  ngOnDestroy(){
    console.log('Destroy');
   
  }

  obtenerTarea(){
    
    this._tareasService.obtenerTarea(this.idTarea).subscribe( (res:any)=>{
      this.datos = false;
      if(this.crear){        
        this.tarea = {
          proyecto: this.proyecto._id,
          nombre: '',
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
      
      this.tarea = res.tarea;
          
      this.arregloParticipante = [];
      this.participante = {};
      this.fecha = '';         
        console.log(this.tarea);
        this.mostrar = this._tareasService.mostrar;
        this.crear = this._tareasService.crear;
         
        //this.tarea = this._tareasService.tarea;
        
        if(this.tarea.participante != null){
          if(this.arregloParticipante.length >=0 && this.arregloParticipante.length <1){
            this.arregloParticipante = [];
            
            this.participante = this.tarea.participante;              
            this.arregloParticipante.push(this.participante);
            console.log(this.arregloParticipante);

          }
        }
        this.nombres = this._tareasService.nombres ;
        this.datos=true;
       
        //this.tarea = this._tareasService.tarea;
       
    
      this._tareasService.enviarFechaObservable.subscribe( res =>{
        this.fecha = '';
        this.fecha = res;
        console.log(this.fecha);
      });
      //Se itera el objeto del participante para extraer después el nombre
      console.log("crear"+this.crear);                       
    } );
  }

    crearEditarTarea(tarea:Tareas){
        this.tarea.proyecto = tarea.proyecto;
        this.tarea.nombre = tarea.nombre;
        this.tarea.descTarea = tarea.descTarea;
        this.tarea.creador = this._usuarioService.usuario._id;
        this.tarea.fechaLimite = this.fecha;
        this.tarea.ultimoEditor = this._usuarioService.usuario._id;
        this.tarea.participante = tarea.participante;
      
        
        console.log(this.tarea.participante);



       
        if(this.crear){
        this._tareasService.crearTarea(this.tarea,this.proyecto._id).                  
          subscribe( res =>{           
            this._tareasService.recargarTarea();

          });

        }else{
          this._tareasService.editarTarea(this.tarea,this.idProyecto).subscribe( res =>{
            console.log(res);
            this._tareasService.recargarTarea();

          });


        }
      

    }

    
    
    obtenerFecha = (fecha) =>this.fecha = fecha;
  eliminarTarea(tarea:Tareas){
    Swal.fire({
      title: 'Estás seguro que deseas eliminar esta tarea?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result) {
        this._tareasService.eliminarTarea(this.idProyecto,tarea._id).subscribe( res =>{
          this.cerrarTarea();     
          this._tareasService.recargarTarea();
        });
       
      }
    });
    

  }
  cerrarTarea(){
    this.mostrar = false;
    this.crear = false;
    this.tarea={};
    this._tareasService.estadoTarea(this.mostrar,this.crear,this.tarea );
    this.editar.emit(this.mostrar);
  }




}
