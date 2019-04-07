import { ModalUploadService } from './modal-upload.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import  Swal from 'sweetalert2';
import { UsuarioService, CambiarImagenService } from 'src/app/services/service.index';



@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {
  @ViewChild ('inputFile')  inputFile :any;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _usuarioService:UsuarioService, public _cambiarImageService: CambiarImagenService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
  }
  seleccionImagen(archivo){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
 
    if(archivo.type.indexOf('image') <0){
      Swal.fire({
        title: 'Solo se permiten imágenes',
        type: 'error'       
      });
      this.imagenSubir=null;
      return;

    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () =>this.imagenTemp = reader.result.toString();

  }

  subirImagen(){
    this._cambiarImageService.subirImagen(this.imagenSubir, this._modalUploadService.tipo, 
      this._modalUploadService.id, this._usuarioService.token)
    .then( res =>{
      console.log(res);
      this._modalUploadService.notificacion.emit(res);
      this.cerrarModal();     
      Swal.fire({
        title: 'Imagen actualizada con éxito',
        type: 'success'       
      });
      this.clearForm();
    }).catch(err =>{
      console.log('error en la carga de imagen');
      

    });
  }
  clearForm() {  
    this.inputFile.nativeElement.value = "";
}
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
