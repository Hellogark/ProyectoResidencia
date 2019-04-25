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
  nombreTarea: string;
  terminado: boolean;
  nombres: any [] = [];
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tareas: Tareas[];
  eventoTareas = {};
  mostrar: boolean;
  crear: boolean;
  



  
  token: string = this._usuarioService.token;
  constructor(public _usuarioService: UsuarioService,public _tareaService:TareasService,public _proyectoService: ProyectoService, public router:Router,
    public rutaActiva:ActivatedRoute, public _location:Location) {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');  
   
   }

  ngOnInit() {
    this.dataLista = false;    
    this.obtenerUsuarios();
    this.obtenerTareas();
    this.obtenerProyecto();
    this.dataLista = true;
  }

  obtenerUsuarios(){
     
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
   }

 
    obtenerTareas(){
      this._tareaService.obtenerTodasTareas(this.id).subscribe( res =>{
        this.tareas = res.tareas;
        console.log(this.tareas);
      });
    } 
    obtenerProyecto(){
      this._proyectoService.obtenerProyecto(this.id).subscribe( res =>{
        console.log(res);
        this.proyecto = res.proyecto;
      });

    }

  mostrarEditar =(mostrar:boolean) => this.mostrar = mostrar;
   

  obtenerFecha = (fecha) =>this.fecha = fecha;


}
