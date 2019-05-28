import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { ProyectoService } from './../../services/proyectos/proyecto.service';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';

import  Swal  from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';
import {DataTableModule} from "angular-6-datatable-cc";
@Component({
  selector: 'app-ver-todos-proyectos',
  templateUrl: './ver-todos-proyectos.component.html',
  styleUrls: ['./ver-todos-proyectos.component.css']
})
export class VerTodosProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  participantes:Usuario[];
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  desde: number = 0;
  encontrado:boolean;
  cargando:boolean = true;
  data: any;
  dataProyectos: any [] = [];
  public config: PaginationInstance = {
   
    itemsPerPage: 10,
    currentPage: 1
};

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  
  onPageChange(number: number) {
    
    this.config.currentPage = number;
  }
  constructor(public _proyectoService:ProyectoService, public _usuarioService:UsuarioService, public router:Router) { }

  ngOnInit() {
    this.cargarProyectos();
  }
  cargarProyectos(){
    this._proyectoService.cargarProyectos()
    .subscribe( (res:any) =>{
     this.proyectos = res.proyectos;
     this.cargarDataProyectos(this.proyectos);
     this.cargando=false;
 });
 }
  eliminarProyecto(proyectoBorrar:Proyecto){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el proyecto: '+proyectoBorrar.nombre+'?',      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._proyectoService.eliminarProyecto(proyectoBorrar._id)
        .subscribe(res =>{
          this.cargarProyectos();
         
        });
       
      }
    });

  }
  buscarProyecto(termino: string){
    
      if(termino ==='' || termino.length <=0){ 
        this.proyectos = [];
        this.dataProyectos = [];
        this.encontrado = false;
          this.cargarProyectos();
        return;}
        this._proyectoService.buscarProyectos(termino)
        .subscribe((proyectos:Proyecto[]) =>{
          
          
          this.proyectos = proyectos;
          this.cargarDataProyectos(this.proyectos);
          this.encontrado = true;
     
      if(termino =='' || this.proyectos.length<=0){this.encontrado = false; 
        }
      
    });
  }
  cargarDataProyectos(proyectos: Proyecto[]){
    this.dataProyectos = [];
    proyectos.forEach(proyecto => {
      this.data = {
        _id: proyecto._id,
        nombre: proyecto.nombre,
        nombreEmpresa:proyecto.nombreEmpresa,
        fechaCreacion:proyecto.fechaCreacion,
        fechaProyectada: proyecto.fechaProyectada, 
        participantes:   proyecto.participantes      
      }
        
      this.dataProyectos.push(this.data);
    });

  }
  }




