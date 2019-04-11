import { Archivos } from './../../models/archivos.model';
import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';

import { Proyecto } from 'src/app/models/proyectos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { TagInputModule } from 'ngx-chips';
import { PaginationInstance } from 'ngx-pagination';
import { DomSanitizer } from '@angular/platform-browser';
import { URL_SERVICIOS } from 'src/app/config/config';
import {saveAs}  from 'file-saver';
import  Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';


TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Añade un participante',      
      // add here other default values for tag-input
  } ,
  dropdown: {
    identifyBy:'_id',
      displayBy: 'nombre'
      // add here other default values for tag-input-dropdown
  }
});

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit { 
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
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

  id :string;
  cargando: boolean = true;
  proyecto:Proyecto;
  dataLista:boolean = false;
  archivo:Archivos;
  descripcion: string;
  file:File;
  archivosMostrar: Archivos [] = [];  
  participantes:Usuario[] = [];
  todosUsuarios:Usuario[] = [];
  nombres: any [] = [];
  nuevoParticipantes = {};
  archivoTemp: string;
  inputVacio: boolean = false;
  nombreArchivo: string;
  fecha: any ;
  token = this._usuarioService.token;
  inputArchivo: any;
  formData = new FormData(); 
  comentario: string;
  progressRef: NgProgressRef;
  
  @ViewChild(DatepickerComponent) date;
  constructor(public router:Router, public _proyectoService:ProyectoService, 
    public _usuarioService:UsuarioService, public rutaActiva:ActivatedRoute,
    private progress: NgProgress) { 
  
      this.id =this.rutaActiva.snapshot.paramMap.get('id');                
      
  }
 
  async ngOnInit() {
    this.cargarProyecto(this.id);
    this.progressRef = this.progress.ref('progreso');
    

   }

 
//Obtener y rellenar lista de usuarios
   obtenerUsuarios(){
     
    this._usuarioService.cargarUsuarios(0,this._usuarioService.token)
    .subscribe(res =>{
        this.todosUsuarios = res.usuarios;
        this.todosUsuarios.map( res =>{
          this.nuevoParticipantes ={
            _id: res._id,
            nombre:res.nombre.toString()          }
          this.nombres.push(this.nuevoParticipantes);
         
        });
        console.log(this.nombres);
       

    });
   }
  
   
//Obtener proyecto de la bd
     cargarProyecto(id){
       this.dataLista = false;
      this._proyectoService.obtenerProyecto(id).subscribe(  (res:any)  => {
        this.proyecto = res.proyecto;
        this.participantes = res.proyecto.participantes;
        console.log(res.proyecto.fechaProyectada);
        let fecha = this.fecha != '' ? res.proyecto.fechaProyectada:'';   
        this.fecha = fecha;  
        this.archivosMostrar = res.proyecto.archivos;
        this.descripcion = this.proyecto.descripcion;

        console.log(this.archivosMostrar);
        this.obtenerUsuarios();
        console.log(this.proyecto);
       
        this.dataLista=true;
        this.cargando = false;
    }, (err) =>{
     console.log(err);
    });
  
  }
  descargarArchivo(archivo: any){      
    console.log(archivo);
    this.cargar();
   
    this._proyectoService.descargarArchivo(this.proyecto._id,archivo.nombre).subscribe( (res:any) =>{   
      console.log(res);
      this.terminado();
     
      
      saveAs(res,'Recursos.rar');
    });
  }
  eliminarArchivo(archivo: Archivos){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el archivo?:',      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result) {
        this._proyectoService.eliminarArchivo(archivo._id,this.proyecto)
        .subscribe(res =>{
          Swal.fire({
            title: 'Archivo eliminado con éxito',
            type: 'success'

          });
          this.cargarProyecto(this.id);
         
        });
       
      }
    });
  }
  obtenerFecha = (fecha) =>this.fecha = fecha;
  //Guardar Proyecto
 editarProyecto(proyecto:Proyecto){
   this.cargar();
   this.proyecto.nombre = proyecto.nombre;
   this.proyecto.descripcion = proyecto.descripcion;
   this.proyecto.nombreEmpresa = proyecto.nombreEmpresa;
   this.proyecto.participantes = proyecto.participantes;
   this.proyecto.ultimoEditor = this._usuarioService.usuario._id;
   this.proyecto.participantes = proyecto.participantes; 
  
  
   this.proyecto.fechaProyectada = this.fecha.toString();  
   
  if (this.file != null ){
    if(this.comentario == '' || this.comentario == null){
      Swal.fire({
        title: 'Introduce una descripción',
        type:'error',
        timer:3500

      });
      return;
    }
    this.archivo =  {
      nombre: this.file.name.trim(),
      comentario: this.comentario,
      responsable: this._usuarioService.usuario._id,
    };
   
    this._proyectoService.subirArchivo(this.archivo,this.file,this.proyecto).subscribe( (res:any) =>{
      
           this._proyectoService.editarProyecto(this.proyecto).subscribe(res =>{
        console.log(res);
        this.terminado();
      });
    });
   this.cargarProyecto(this.id);
 /*  this._proyectoService.subirArchivo(this.archivo,this.formData,this.proyecto).subscribe(res =>{
    console.log(res);
  }); */}else{
    this._proyectoService.editarProyecto(this.proyecto).subscribe(res =>{
      console.log(res);
      this.terminado();
    })

  } 
  
 }

 archivoInput(archivo){
   let size = Math.round(((archivo.size / 1024)/1024)*100)/100;
   if(size > 10){
     Swal.fire({
      text: 'El tamaño del archivo es muy grande, max: 10MB',
      toast:true,
      type:'error' 
     });
     return;
   }
   if(archivo === undefined || archivo === ''){return;}
  
   console.log(archivo);
   this.nombreArchivo = archivo.name.trim();
   this.verificarArchivo(archivo);
   this.file = archivo;
   this.formData.append('archivo', this.file, this.file.name); 

   console.log(this.file);
 }


//Verificar archvio
verificarArchivo(archivo){
  let nombreA = archivo.name;

  if(nombreA != ""){
      let ext = nombreA.split('.');

      if(ext.length > 2) {
        Swal.fire({
          title: 'Error al cargar archivo, solo se permiten archivos zip y/o rar',
          type: 'error',
          toast: true,
          timer: 3500
        })
          nombreA="";
          this.inputArchivo = null;
          this.inputVacio = false;

        return false;
      }   
  
       let arr1 = new Array;        
       arr1 = nombreA.split("\\");            
       let len = arr1.length;            
       let img1 = arr1[len-1];            
       let filext = img1.substring(img1.lastIndexOf(".")+1);

       // Checking Extension

       if(!(filext == "rar" || filext == "zip" )){


         Swal.fire({
           title: 'Error al cargar archivo, solo se permiten archivos zip y/o rar',
           type: 'error',
           toast: true,
           timer: 3500
         })
       nombreA= "";
       this.inputArchivo = '';
       this.inputVacio = false;
       

       return false;
       } else         
       {
         this.inputVacio = true;

         return true;}

       }
 }
 onPageChange(number: number) {
  console.log('change to page', number);
  this.config.currentPage = number;
}

cargar() {
  this.progressRef.start();
}

terminado() {
  this.progressRef.complete();
}
}
   
    
     
  


