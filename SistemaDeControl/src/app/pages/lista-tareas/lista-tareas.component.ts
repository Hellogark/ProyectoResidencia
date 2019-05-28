import { Tareas } from './../../models/tareas.model';
import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import {Location} from '@angular/common';

import { Proyecto } from 'src/app/models/proyectos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { MostrarTareaComponent } from '../../shared/mostrar-tarea/mostrar-tarea.component';
import { EditarTareaComponent } from '../../shared/editar-tarea/editar-tarea.component';
import { TagInputModule } from 'ngx-chips';
import  Swal from 'sweetalert2';
import { TareasService } from '../../services/proyectos/tareas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {
  id :string;
  cargando: boolean = true;
  proyecto:Proyecto;
  dataLista:boolean = true;
  descripcionTarea: string;
  nuevosParticipantes = {};
  fecha: any ;
  nombre: string;
  terminado: boolean;
  nombres: any [] = [];
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tareas: Tareas[];
  eventoTareas = {};
  mostrar: boolean;
  crear: boolean;
  



  
  token: string = this._usuarioService.token;
  constructor(public _usuarioService: UsuarioService,public _tareasService:TareasService,public _proyectoService: ProyectoService, public router:Router,
    public rutaActiva:ActivatedRoute, public _location:Location) {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');  
   
   }

  ngOnInit() {
    this.dataLista = false;    
  
    this.obtenerTareas();
    this.obtenerProyecto();
    this._tareasService.mostrarTareaObservable.subscribe( (res:any) =>{
      this.mostrar = this._tareasService.mostrar;
      this.crear = this._tareasService.crear;
    });    
    this.dataLista = true;
   
  }

    obtenerTareas(){
      this._tareasService.obtenerTodasTareas(this.id).subscribe( res =>{
        
        this.tareas=res;
      });
    } 
    obtenerProyecto(){
      this._proyectoService.obtenerProyecto(this.id).subscribe( res =>{
   
        this.proyecto = res.proyecto;
      });

    }

  mostrarEditar =(mostrar:boolean) => this.mostrar = mostrar;
   




}
