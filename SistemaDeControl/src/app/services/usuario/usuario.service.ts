import {  throwError } from 'rxjs';
import { CambiarImagenService } from './../cambiarImagen/cambiarImagen.service';
import { Router } from '@angular/router';
import { URL_SERVICIOS} from './../../config/config';
import { Injectable, OnInit } from '@angular/core'; 
import { Usuario} from '../../models/usuario.model';
import { HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import { map, catchError} from 'rxjs/operators';


import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];
  constructor(public http: HttpClient, public router:Router, public _subArService:CambiarImagenService,public _modalUploadService: ModalUploadService) {
    this.cargarStorage();
    this._modalUploadService.notificacion.subscribe(res => {

    if(this.usuario._id === res.usuario._id){
      
        this.guardarStorage(this.usuario._id,this.token,res.usuario,this.menu);
      }
      
    });

  }

  renuevaToken(){
    let url = URL_SERVICIOS+ 'login/renuevatoken';
    url += '?token='+this.token;
    return this.http.get(url).pipe( map ((res:any) =>{
      this.token = res.token;
      localStorage.setItem('token',this.token);
      console.log('Token renovado');
    })
    ,catchError((err) =>{
     this.logout();
      return throwError(err);

    } 
    ));
  }
  OnInit(){
    
  }



  estaLogueado(){
    if(this.token === ''  || this.token === undefined){
      console.log(this.token);
      this.router.navigate(['/login']);
      return;
    }else{
     this.token = localStorage.getItem('token');
    return this.token.length >1 ? true : false;
    }
  }
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    

  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + 'usuario';

    return this.http.post(url, usuario)
      .pipe(map((res: any) => {
        Swal.fire('Usuario creado correctamente', usuario.correo, 'success');
        return res.usuario;

      }),catchError((err) =>{
        console.log(err.error.mensaje);
        Swal.fire({
          title: err.error.mensaje,
          text:err.error.errors.errors.correo.message,
          type: 'error',
          toast: true,
          timer: 3500
  
  
        }      );
        return throwError(err);
  
      }));
    }

  guardarStorage(id: string, token: string, usuario: Usuario, menu:any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      return this.token;
    
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
     
    }
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('correo', usuario.correo);
    } else {
      this.token = '';
      this.usuario = null;
      this.router.navigate(['/login']);
    }

    let url = URL_SERVICIOS + 'login';
    return this.http.post(url, usuario).pipe(map((res: any) => {
     
     this.guardarStorage(res.id,res.token,res.usuario, res.menu);
      return true;
    }),catchError((err) =>{
      console.log(err.error.mensaje);
      Swal.fire({
        title: err.error.mensaje,
        type: 'error',
        toast: true,
        timer: 3500


      }      );
      return throwError(err);

    }));
  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'usuario/'+usuario._id;
    url+='?token='+this.token;
    return this.http.put(url,usuario).pipe(map((res: any) => {   
     // this.usuario = res.usuario;
     console.log(usuario._id + 'this' + this.usuario._id);
     
      let usuarioDB = res.usuario;
      this.guardarStorage(usuarioDB._id,this.token,usuarioDB, this.menu);     
      Swal.fire('Usuario actualizado!', 'acabas de actualizar tu cuenta', 'success') ;
     
       return true;
     }),catchError((err) =>{
      console.log(err);
      Swal.fire({
        title: err.error.mensaje,
        text:err.error.correo.message,
        type: 'error',
        toast: true,
        timer: 3500


      }      );
      return throwError(err);

    }));

  }

  actualizarUsuarios(usuario:Usuario){
    console.log(usuario);
  let url = URL_SERVICIOS+'usuario/editarUsuario/'+usuario._id;
    url+='?token='+this.token;
    return this.http.put(url,usuario).pipe(map((res: any) => {   
      // this.usuario = res.usuario;
      console.log(usuario._id + 'this' + this.usuario._id);
      if(res.usuario._id === this.usuario._id){

        let usuarioDB = res.usuario;
        this.guardarStorage(usuarioDB._id,this.token,usuarioDB, this.menu);
      }
      
       Swal.fire('Usuario actualizado!', 'acabas de actualizar tu cuenta', 'success') ;
      
        return res;
      }));

  }

  cambiarImagen(file: File, id:string){
    this._subArService.subirImagen(file, 'usuarios', id, this.token).then((resp: any) =>{
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      Swal.fire('Imagen de usuario Actualizada','','success');
      this.guardarStorage(id,this.token,this.usuario, this.menu);
     
    }).catch( resp =>{
      console.log(resp);
    });
  }

  cargarUsuarios( desde:number = 0,token:string){

   let url = URL_SERVICIOS + 'usuario?token='+token+'&amp;desde='+desde;
   return this.http.get(url).pipe(map((res:any)=>{
     console.log(res );
    return res;

   }));


  }



  buscarUsuarios(termino: string){
    let url = URL_SERVICIOS + 'busqueda/info/usuarios/'+termino;
    return this.http.get(url).pipe(map((res:any)=>{
      return res.usuarios;
    }));

  }

  borrarUsuario(id:string){
   let url = URL_SERVICIOS + 'usuario/'+id;
   url+='?token='+this.token;
    return this.http.delete(url).pipe(map((res:any)=>{
      Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado correctamente!',
        'success'
      );
      return true;
    }));
  }

   


}
