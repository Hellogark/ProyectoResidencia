import { ModalUploadService } from './modal-upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import  Swal from 'sweetalert2';
import { UsuarioService, CambiarImagenService } from 'src/app/services/service.index';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Usuario } from '../../models/usuario.model';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';





@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {
  @ViewChild ('inputFile')  inputFile :any;
  imagenSubir: File;
  imagenTemp: string;
  imageChangedEvent: any = '';
    croppedImage: any = '';
    archivoEnviar: any; 
    usuario:Usuario;
    progressRef: NgProgressRef;

 
 


  constructor(public _usuarioService:UsuarioService, public _cambiarImageService: CambiarImagenService,
    public _modalUploadService: ModalUploadService,private progress: NgProgress) { 
   
    }

  ngOnInit() {
    this.usuario = this._modalUploadService.usuario ;
    this.progressRef = this.progress.ref('progreso');
  }
  seleccionImagen(archivo){
    this.imageChangedEvent = archivo;
    this.archivoEnviar = archivo.target.files[0];
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    if(this.archivoEnviar.type.indexOf('image') <0){
      Swal.fire({
        title: 'Solo se permiten imágenes',
        type: 'error'       
      });
      this.imagenSubir=null;
      return;
    }  
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(this.archivoEnviar);

    reader.onloadend = () =>{
      this.imagenTemp = reader.result.toString();
    }
  }
 
  
  subirImagen(){
    this.cargar();
    this._cambiarImageService.subirImagen(this.imagenSubir, 
      this._modalUploadService.id, this._usuarioService.token)
    .then( res =>{
      this.terminado();
      this._modalUploadService.notificacion.emit(res);
      
      this.cerrarModal();     
      Swal.fire({
        title: 'Imagen actualizada con éxito',
        type: 'success'       
      });
      this.clearForm();
    }).catch(err =>{
      

    });
  }
  clearForm() {  
    this.inputFile.nativeElement.value = "";
}
  cerrarModal(){   
    this.imagenSubir = null;  
    this.croppedImage = '';
      this.imageChangedEvent = '';
      this.imagenTemp = '';     
      this.inputFile.nativeElement.value = "";
      this.usuario = null;
    this._modalUploadService.ocultarModal();
  }
  imageCropped(event: ImageCroppedEvent) {
    //preview
    this.croppedImage = event.base64;
    //Convertir para subir
    const ARCHIVO_SELECCIONADO = this.archivoEnviar;
    this.imagenSubir = new File([event.file], ARCHIVO_SELECCIONADO.name,
      {type: ARCHIVO_SELECCIONADO.type});
}

loadImageFailed() {
   Swal.fire({
     title: 'Hubo un problema al cargar la imagen',
     type: 'error',
     timer:3500,
     toast:true
   })
}
cargar() {
  this.progressRef.start();
}

terminado() {
  this.progressRef.complete();
}
}
