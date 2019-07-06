import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Archivos } from './../../models/archivos.model';
import { DatepickerComponent } from './../../shared/datepicker/datepicker.component';
import { Proyecto } from 'src/app/models/proyectos.model';
import { ProyectoService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { TagInputModule } from 'ngx-chips';
import { PaginationInstance } from 'ngx-pagination';
import { URL_SERVICIOS } from 'src/app/config/config';
import {saveAs} from 'file-saver';
import Swal from 'sweetalert2';
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

proyecto:Proyecto;
archivo:Archivos;
file:File;
descripcion: string;
archivosMostrar: Archivos [] = [];
participantes:Usuario[] = [];
todosUsuarios:Usuario[] = [];
@ViewChild('inputArchivo') inputArchivo: any;
valorInputFile: any;
nombres: any [] = [];
nuevoParticipantes = {};
archivoTemp: string;
id :string;
comentario: string;
nombreArchivo: string;
dataLista:boolean = false;
cargando: boolean = true;
inputVacio: boolean = false;
desabilitado: boolean = true;
token = this._usuarioService.token;
fecha: any ;
formData = new FormData();
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
         nombre:res.nombre.toString() }
         this.nombres.push(this.nuevoParticipantes);

         });
    });
}


//Obtener proyecto de la bd
cargarProyecto(id){
    this.dataLista = false;
    this._proyectoService.obtenerProyecto(id).subscribe( (res:any) => {
          
    this.proyecto = res.proyecto;
    this.participantes = res.proyecto.participantes;
    let fecha = this.fecha != '' ? res.proyecto.fechaProyectada:'';
    this.fecha = fecha;
    this.archivosMostrar = res.proyecto.archivos;
  
    this.descripcion = this.proyecto.descripcion;

    this.obtenerUsuarios();


    this.dataLista=true;
    this.cargando = false;
    }, (err) =>{});

}
cargarDatosArchivo(){
    this.archivo = {
        nombre: this.file.name.trim(),
        comentario: this.comentario,
        responsable: this._usuarioService.usuario._id,
    };
    
}
subirArchivo(){
    
    if (this.file != null || this.file){
        if(this.comentario == '' || this.comentario == null){
            Swal.fire({
            title: 'Introduce una descripción',
            type:'error',
            timer:3500
            });
            this.terminado();
            return;
        }                    
    }
  

  
        this._proyectoService.subirArchivo(this.archivo,this.file,this.proyecto).subscribe( (res:any) =>{
            this.terminado();
            this.quitarArchivo();
        },(err)=>{
            this.quitarArchivo();
            this.terminado();

        });
 
}

falloDescarga(){
    Swal.fire({
        title: 'El archivo no existe o no se encuentra disponible',       
        type: 'error',        
        timer: 3500
      });
}

eliminarArchivo(archivo: Archivos){
  
        Swal.fire({
        title: '¿Estás seguro que deseas eliminar el archivo?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this._proyectoService.eliminarArchivo(archivo,this.proyecto)
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
async editarProyecto(proyecto:Proyecto){
        this.cargar();
        this.proyecto.nombre = proyecto.nombre;
        this.proyecto.descripcion = proyecto.descripcion;
        this.proyecto.nombreEmpresa = proyecto.nombreEmpresa;
        this.proyecto.participantes = proyecto.participantes;
        this.proyecto.ultimoEditor = this._usuarioService.usuario._id;
        this.proyecto.fechaProyectada  = this.fecha != undefined ? this.fecha.toString():'';

            await this._proyectoService.editarProyecto(this.proyecto).subscribe(res =>{
                this.cargarProyecto(this.id);
            this.terminado();
            });
      
}

archivoInput(archivo) {
    let size = Math.round(((archivo.size / 1024) / 1024) * 100) / 100;
    if (size > 10) {
        Swal.fire(
            {text: 'El tamaño del archivo es muy grande, max: 10MB', toast: true, type: 'error'}
        );
        return;
    }
    if (archivo === undefined || archivo === '') return;

    this.nombreArchivo = archivo
        .name
        .trim();
    this.verificarArchivo(archivo);
    this.file = archivo;
    this
        .formData
        .append('archivo', this.file, this.file.name);

}


//Verificar archvio
verificarArchivo(archivo) {
    let nombreA = archivo.name;

    if (nombreA != "") {
        let ext = nombreA.split('.');

        if (ext.length > 2) {
            Swal.fire(
                {title: 'Error al cargar archivo, solo se permiten archivos zip y/o rar', type: 'error', toast: true, timer: 3500}
            )
            nombreA = "";
            this.inputArchivo = null;
            this.inputVacio = false;

            return false;
        }

        let arr1 = new Array;
        arr1 = nombreA.split("\\");
        let len = arr1.length;
        let img1 = arr1[len - 1];
        let filext = img1.substring(img1.lastIndexOf(".") + 1);

        // Checking Extension

        if (!(filext == "rar" || filext == "zip")) {

            Swal.fire(
                {title: 'Error al cargar archivo, solo se permiten archivos zip y/o rar', type: 'error', toast: true, timer: 3500}
            )
            nombreA = "";
            this.inputArchivo = '';
            this.inputVacio = false;

            return false;
        } else {
            this.inputVacio = true;
            return true;
        }

    }
}
onPageChange(number: number) {
    this.config.currentPage = number;
}

cargar() {
    this.progressRef.start();
}

terminado() {
    this.progressRef.complete();
}
irTareas() {

    this.router.navigate([ 'todas-tareas',this.id]);
}
quitarArchivo() {
    this.valorInputFile = this.inputArchivo.nativeElement.value;
    this.valorInputFile =  "";
    this.inputVacio = false;
    this.comentario =  "";
    this.file = null;
    this.desabilitado = true;

}

}
