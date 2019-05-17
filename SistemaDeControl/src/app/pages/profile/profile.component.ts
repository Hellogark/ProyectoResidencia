import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import  Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild ('inputFile')  inputFile :any;
  usuario:Usuario;
  passwordAnterior ='';
  passwordNuevo1='';
  passwordNuevo2='';
  imagenSubir: File;
  imagenTemp: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  archivoEnviar: any;  

  constructor(public _usuarioService:UsuarioService) { 


  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario)
  }

  guardar(usuario:Usuario){
      this.usuario.nombre = usuario.nombre;
      this.usuario.correo = usuario.correo;
      //Añadir al schema el password viejo y realizar esto
      this._usuarioService.actualizarUsuario(this.usuario).subscribe((res)=>{
             });
  }
  cambiarPass(passAnt:any,pass1:any,pass2:any){
    this.passwordNuevo1 = pass1.value;
    this.passwordNuevo2 = pass2.value;
    this.passwordAnterior = passAnt.value;

    
    if(this.passwordNuevo1 != this.passwordNuevo2){
   
      return; 
    }
    this.usuario.password = this.passwordNuevo2;
    this.usuario.passwordAnterior= this.passwordAnterior;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe((res)=>{});
  }

  seleccionImagen(archivo){
    this.imageChangedEvent = archivo;
    this.archivoEnviar = archivo.target.files[0];
    
    if(!this.archivoEnviar){
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
      return console.log(this.imagenSubir);
    }
  }
  cambiarImagen(){
    console.log(this.imagenSubir);
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id)
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.imagenTemp = '';
    this.inputFile.nativeElement.value = "";
  }
  
  imageCropped(event: ImageCroppedEvent) {
    //preview
    this.croppedImage = event.base64;
    //Convertir para subir
    const archivoSeleccionado = this.archivoEnviar;
    this.imagenSubir = new File([event.file], archivoSeleccionado.name,
      {type: archivoSeleccionado.type});
}
loadImageFailed() {
  Swal.fire({
    title: 'Hubo un problema al cargar la imagen',
    type: 'error',
    timer:3500,
    toast:true
  })
}

}
