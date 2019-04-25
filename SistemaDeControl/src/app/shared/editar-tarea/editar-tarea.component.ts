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
  tarea:Tareas = {};
  nuevosParticipantes  = {};

  @Input() nombres: any [] = [];
  @Input() proyecto: Proyecto;
  @Input() dataLista;
  crear:boolean;
  mostrar:boolean;
  
  @Output() editar = new EventEmitter();

  
  descripcion: string;

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
   public _tareasService:TareasService ) {
     this._tareasService.mostrarTareaObservable.subscribe( res =>{
      console.log(res);
     });


   }

  ngOnInit() {
    if(this.crear){
    this.tarea = {};
    }
    console.log("crear"+this.crear);
   
  }

    crearEditarTarea(tarea:Tareas){
      
      console.log(tarea);

    }
  
  cerrarTarea(){
    this.mostrar = false;
    this.editar.emit(this.mostrar);
  }
 

}
