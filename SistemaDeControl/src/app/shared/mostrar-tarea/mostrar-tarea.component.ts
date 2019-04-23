import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ProyectoService } from '../../services/proyectos/proyecto.service';
import { TareasService } from '../../services/proyectos/tareas.service';
import { Tareas } from '../../models/tareas.model';
import { Proyecto } from '../../models/proyectos.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mostrar-tarea',
  templateUrl: './mostrar-tarea.component.html',
  styleUrls: ['./mostrar-tarea.component.css']
})
export class MostrarTareaComponent implements OnInit {

  arregloTareas: Tareas[] = [];
  @Output() editar = new EventEmitter();
  @Input() proyecto: Proyecto;
  mostrar: boolean = false;
  idProyecto: string;

  constructor(public _usuarioService: UsuarioService, public _proyectoService:ProyectoService,  public rutaActiva: ActivatedRoute) { 
     this.rutaActiva.params.subscribe( (param:any) =>{   
      this.idProyecto = param;
    });

  }

  ngOnInit() {
    //this.obtenerTareas();
  }

  editarTarea(){
    this.mostrar = !this.mostrar;
    this.editar.emit(this.mostrar);
    
  }

 



}
