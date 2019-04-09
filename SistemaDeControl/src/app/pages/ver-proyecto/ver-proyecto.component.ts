import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import { Archivos } from './../../models/archivos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Location } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
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
  fecha: any;
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
        
        console.log(this.nombres);
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
        console.log(this.proyecto);
        this.dataLista=true;
    }, (err) =>{
     console.log(err);
    });
  
  }
  descargarArchivo(archivo: any){      
    console.log(archivo);
    this.cargar();
   
    this._proyectoService.descargarArchivo(this.proyecto._id,archivo.nombre).subscribe( (res:any) =>{   
      console.log(res);
     
      
      this.archivoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.location.protocol + '//' + window.location.host + "/descarga.rar"); 
      console.log(this.archivoUrl);
      this.terminado();
      saveAs(res,'Recursos.rar');
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
}
