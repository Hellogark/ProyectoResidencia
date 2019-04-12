import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ProyectoService, UsuarioService, TareasService } from 'src/app/services/service.index';
import { TagInputModule } from 'ngx-chips';

import  Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {
  fecha: any;
  asignado:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  nuevosParticipantes  = {};
  nombres: any [] = [];
  descripcion: string;
  proyecto: Proyecto;

  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _usuarioService:UsuarioService, public _proyectoService:ProyectoService,
   public _tareasService:TareasService ) { 


   }

  ngOnInit() {

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
  

}
