import { Tareas } from './../../models/tareas.model';
import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import {Location} from '@angular/common';

import { Proyecto } from 'src/app/models/proyectos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { EditarTareaComponent } from '../../shared/editar-tarea/editar-tarea.component';
import { TagInputModule } from 'ngx-chips';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {
  id :string;
  cargando: boolean = true;
  proyecto:Proyecto;
  dataLista:boolean = false;
  descripcionTarea: string;
  nuevoParticipantes = {};
  fecha: any ;
  nombreTarea: string;
  terminado: boolean;
  nombres: any [] = [];
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  tareas: Tareas[];
  mostrar: boolean;


  
  token: string = this._usuarioService.token;
  constructor(public _usuarioService: UsuarioService, public router:Router,
    public rutaActiva:ActivatedRoute, public _location:Location) {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
   }

  ngOnInit() {

  }

  obtenerFecha = (fecha) =>this.fecha = fecha;


}
