import { Proyecto } from 'src/app/models/proyectos.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios:Usuario[] = [];
  proyectos: Proyecto[] = [];
  token = this._usuarioService.token;
  constructor(public activatedRoute: ActivatedRoute, public http:HttpClient, public router:Router, public _usuarioService:UsuarioService) {

      activatedRoute.params.subscribe(params =>{
        let termino = params['termino'];
       this.buscar(termino);
      });

  }

  ngOnInit() {
  }
  buscar(termino: string){
    if(termino == ''){
      this.router.navigate(['/dashboard']);

      return;}
   let url = URL_SERVICIOS+'busqueda/todo/'+termino+'?token='+this.token;
    this.http.get(url).subscribe( (res:any) =>{
      console.log(res);
      this.usuarios = res.usuarios;
      this.proyectos = res.proyectos;
    });

  }
  redireccionar(termino: string){
    this.router.navigate(['/ver-usuarios',termino]);


  }
}
