import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { TareasService } from '../../services/proyectos/tareas.service';
import { Tareas } from '../../models/tareas.model';
import { Proyecto } from '../../models/proyectos.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-mostrar-tarea',
  templateUrl: './mostrar-tarea.component.html',
  styleUrls: ['./mostrar-tarea.component.css']
})
export class MostrarTareaComponent implements OnInit {
  @Input() proyecto: Proyecto;
  @Output() editar = new EventEmitter();
  @Input() tareas: Tareas[] = [];
  nuevaTarea:Tareas;
  mostrar: boolean = false;
  crear: boolean = false;
  idProyecto: string;
  @Input() dataLista:boolean;


  constructor(public _usuarioService: UsuarioService, public _proyectoService:ProyectoService, 
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute) { 
    this.idProyecto = this.rutaActiva.snapshot.paramMap.get('id');


  }

  ngOnInit() {
  
  }

  editarTarea( tipo:string ){
    this.mostrar = !this.mostrar;
    if(tipo == 'crear'){
      this.crear = true;
      this.editar.emit(this.mostrar);
      this.editar.emit(this.crear);

    }
    if(tipo == 'editar'){

      this.editar.emit(this.mostrar);
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
      alert(res);


    });

  }
  chkTarea(tarea:Tareas){
    console.log(tarea);
    alert(tarea);

  }

 



}
