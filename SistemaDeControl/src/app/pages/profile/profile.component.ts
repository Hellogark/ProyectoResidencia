import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usuario:Usuario;
  passwordAnterior ='';
  passwordNuevo1='';
  passwordNuevo2='';
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService:UsuarioService) { 
    

  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario.nombre)
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
  cambiarImagen(){
    console.log(this.imagenSubir);
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }
 
 

}
