import { Proyecto } from 'src/app/models/proyectos.model';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  usuarios:Usuario[] = [];
  proyectos: Proyecto[] = [];
  termino: string;
  token = this._usuarioService.token;
  constructor(public activatedRoute: ActivatedRoute, public http:HttpClient, public router:Router,
     public _usuarioService:UsuarioService,  public _location:Location) {

      activatedRoute.params.subscribe(params =>{
        this.termino = params['termino'];
       this.buscar(this.termino);
      });

  }

  ngOnInit() {
  }
  buscar(termino: string){
    if(this.termino == ''){
      this.router.navigate(['/inicio'])
      return;
    }
   let url = URL_SERVICIOS+'busqueda/todo/'+termino+'?token='+this.token;
    this.http.get(url).subscribe( (res:any) =>{
      this.usuarios = res.usuarios;
      this.proyectos = res.proyectos;
    });

  }
  redireccionar(termino: string){
    this.router.navigate(['/ver-usuarios',termino]);


  }
}
