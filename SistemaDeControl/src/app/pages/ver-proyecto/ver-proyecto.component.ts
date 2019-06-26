import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import { Archivos } from './../../models/archivos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import {saveAs}  from 'file-saver';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';

import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public cargando: boolean = true;

  fecha: any;
  public config: PaginationInstance = {
   
    itemsPerPage: 5,
    currentPage: 1
};


public labels: any = {
  previousLabel: 'Anterior',
  nextLabel: 'Siguiente',
  screenReaderPaginationLabel: 'Pagination',
  screenReaderPageLabel: 'page',
  screenReaderCurrentLabel: `You're on page`
};
  id:string;
  proyecto: Proyecto;
  dataLista: boolean = false;
  participantesVer:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  archivo:Archivos;
  archivosMostrar: Archivos [] = [];  
  nombres: any [] = [];
  nuevoParticipantes = {};
  archivoUrl;
  progressRef: NgProgressRef;


  constructor(public _proyectoService:ProyectoService, public _usuarioService:UsuarioService, 
    public router:Router,public rutaActiva:ActivatedRoute, public _location:Location, private sanitizer: DomSanitizer,
     private progress: NgProgress) { 
      this.id =this.rutaActiva.snapshot.paramMap.get('id');     
     
         
      
      }
 

  ngOnInit() {
    this.cargarProyecto(this.id);
    this.progressRef = this.progress.ref('progreso');

      
  }
  obtenerUsuarios(){
    this._usuarioService.cargarUsuarios(0,this._usuarioService.token)
    .subscribe(res =>{
        this.todosUsuarios = res.usuarios;
        this.todosUsuarios.map( res =>{
          this.nuevoParticipantes ={
            _id: res._id,
            nombre:res.nombre.toString()

          }
          this.nombres.push(this.nuevoParticipantes);
        });
        
        
    });
   }
     cargarProyecto(id){
       this.dataLista = false;
      this._proyectoService.obtenerProyecto(id).subscribe(  (res:any)  => {
        this.proyecto = res.proyecto;
        this.participantesVer = res.proyecto.participantes;
        this.fecha = res.proyecto.fechaProyectada;
        this.archivosMostrar= res.proyecto.archivos;
    
        this.obtenerUsuarios();
        
        this.dataLista=true;
        this.cargando = false;
    }, (err) =>{
      console.log(err);
    });
  
  }

  volver(){
    this._location.back();
  }
  obtenerFecha = (fecha) =>this.fecha = fecha;

  cargar() {
    this.progressRef.start();
  }
  
  terminado() {
    this.progressRef.complete();
  }
  onPageChange(number: number) {
    
    this.config.currentPage = number;
  }

  falloDescarga(){
    Swal.fire({
        title: 'El archivo no existe o no se encuentra disponible',       
        type: 'error',        
        timer: 3500
      });
}
}
