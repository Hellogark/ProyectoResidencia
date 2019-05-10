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
  @Input() mostrar:boolean; 
  @Input() crear:boolean;
   @Output() public editar = new EventEmitter();
  eliminar: boolean =  false;
  datos: boolean = false;
  descripcion: string;
  datosTarea: Object = {};
  path:string;

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
    
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute, public _location:Location ) {
     
      this.path = this._location.path().toString();

    }
    ngOnInit(){
      
      if(this._tareasService.subscripcionCerrar === undefined){
        this._tareasService.subscripcionCerrar = this._tareasService.llamarCerrarTarea.subscribe( (data:any) =>{
         this.cerrarTarea();
        });
      }
      console.log(this.mostrar +' | '+this.crear)
      if(this.tarea == undefined && !this.crear){
        this.datos = false; 
        this.obtenerTarea();
        }else{
        if(this.crear){ 
          this.datos = false; 
          this.crearTareaVacia();    
          this.inicializarTags();     
        }

      }
      this._tareasService
      .mostrarTareaObservable.subscribe( res =>{ 
        this.crear = this._tareasService.crear;
      this.mostrar = this._tareasService.mostrar; 
      });
    }
    ngOnChanges(){       
      
        if(this.crear){ 
          console.log('entrea');
          this.crearTareaVacia();    
          this.inicializarTags();     
        }else{
        if(this.tarea != undefined && !this.crear){this.obtenerTarea();}

        }
     
      
    }
  
  ngOnDestroy(){
    this.cerrarTarea();

  }
  crearTareaVacia(){
        this.tarea = {}
        this.tarea = {
        proyecto: this.proyecto.nombre,
        nombre: '',
        descTarea: '',
        creador: '',
        finalizado: false,
        ultimoEditor: '',
        fechaCreacion: '',
        fechaFinalizado: '',
        fechaLimite: moment().locale('es').format('l'),
        participante: null,
        
        
       
      } 
      this._tareasService.enviarFecha(this.tarea.fechaLimite);
      this.fecha = this._tareasService.fecha; 
      if(this.tarea.fechaLimite === undefined || this.tarea.fechaLimite === null){
        this._tareasService.fecha = '';
      }
      
      this.datos = true;    
    
  }
  obtenerTarea(){
      console.log(this.idTarea);
        //Se itera el objeto del participante para extraer después el nombre     
    this._tareasService.obtenerTarea(this.idTarea).subscribe( (res:any)=>{
      this.datos = false;
      this.idProyecto = res.tarea.proyecto._id;
      this.fecha = this._tareasService.fecha;    
      if(res.tarea == null){return;}
      this.tarea = res.tarea != null ? res.tarea: {};
      this.inicializarTags();
          
      
      this.datos=true;
      
      this._tareasService.enviarFechaObservable.subscribe( res =>{
       this.fecha = '';
       this.fecha = res;
       console.log(res);
     });
      
       
       
      
      } );
     
  }

    crearEditarTarea(tarea:Tareas){
 
      this.tarea.nombre = tarea.nombre;
      this.tarea.descTarea = tarea.descTarea;
      this.tarea.creador = this._usuarioService.usuario._id;
      this.tarea.fechaLimite = this.fecha;
      this.tarea.ultimoEditor = this._usuarioService.usuario._id;
      this.tarea.participante = tarea.participante;

        console.log(tarea.participante);

        if(this.crear){
        this._tareasService.crearTarea(this.tarea,this.proyecto._id).                  
          subscribe( res =>{           
            this._tareasService.recargarTarea();

          });

        }else{
          this._tareasService.editarTarea(this.tarea).subscribe( res =>{
            console.log(res);
            this._tareasService.recargarTarea();

          });


        }
      

    }

    inicializarTags(){
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
      if (result.value) {
        this._tareasService.eliminarTarea(this.idProyecto,tarea._id).subscribe( res =>{
          this._tareasService.recargarTarea();
          this.cerrarTarea();     
        });
       
      }
    });
    

  }
  cerrarTarea(){
    this.mostrar = false;
    this.crear = false;
    this.tarea={};
    this.fecha = '';

    this._tareasService.estadoTarea(this.mostrar,this.crear);
   
    this.editar.emit(this.mostrar);
    this.editar.emit(this.crear);
  }




}
