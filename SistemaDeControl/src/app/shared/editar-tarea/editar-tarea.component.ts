import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProyectoService, UsuarioService, TareasService } from 'src/app/services/service.index';
import { TagInputModule } from 'ngx-chips';
import  Swal from 'sweetalert2';
import { Tareas } from '../../models/tareas.model';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {
  fecha: any;
  asignado:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tarea:Tareas;
  nuevosParticipantes  = {};
  participante:Usuario; 
  @Input() nombres: any [] = [];
  @Input() proyecto: Proyecto;
  @Input() dataLista;
  @Output() editar = new EventEmitter();
  datos: boolean = false;
  crear:boolean;
  mostrar:boolean;  
  descripcion: string;

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
    
    public _tareasService:TareasService ) {
      
    }
    ngOnChanges(){

    }
    ngOnInit() {
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
             this.mostrar = this._tareasService.mostrar;
             this.crear = this._tareasService.crear;
             this.tarea = this._tareasService.tarea;
             this.fecha = this.tarea.fechaFinalizado;
             this.participante = this.tarea.participante;
            });
    console.log("crear"+this.crear);
    console.log(this.tarea);
    this.datos = true;
   
  }

    crearEditarTarea(tarea:Tareas){
        this.tarea.proyecto = tarea.proyecto;
        this.tarea.nombreTarea = tarea.nombreTarea;
        this.tarea.descTarea = tarea.descTarea;
        this.tarea.creador = this._usuarioService.usuario._id;
        this.tarea.fechaFinalizado = this.fecha;
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

    }
    obtenerFecha = (fecha) =>this.fecha = fecha;

  cerrarTarea(){
    this.mostrar = false;
    this.crear = false;
    this.tarea={};
    this._tareasService.estadoTarea(this.mostrar,this.crear,this.tarea );
    this.editar.emit(this.mostrar);
  }
 

}
