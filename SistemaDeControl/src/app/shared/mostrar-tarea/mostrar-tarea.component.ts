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
  @Input() tareas: Tareas[] = [];
  @Input() eventoTarea:{};
  @Input() dataLista;
  nuevaTarea:Tareas;
  mostrar: boolean;
  crear: boolean ;
  idProyecto: string;


  constructor(public _usuarioService: UsuarioService, public _proyectoService:ProyectoService, 
    public _tareasService:TareasService, public rutaActiva: ActivatedRoute) { 
    this.idProyecto = this.rutaActiva.snapshot.paramMap.get('id');
   


   
  }

  ngOnInit() {
   this._tareasService.mostrarTareaObservable.subscribe( (res:any) =>{
    this.mostrar = this._tareasService.mostrar;
    this.crear = this._tareasService.crear;
     console.log("mostrar "+this.mostrar+"crear " +this.crear);
     console.log(res);
     });
  }

  editarTarea( tipo:string,tarea:Tareas ){
    this.mostrar = !this.mostrar;
    if(tipo === 'crear'){
      this.crear = true;
      this._tareasService.estadoTarea(this.mostrar,this.crear); 
      
    }
    if(tipo === 'editar'){
      this.crear=false;
      this._tareasService.estadoTarea(this.mostrar,this.crear,tarea);
      console.log(tarea);      
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
