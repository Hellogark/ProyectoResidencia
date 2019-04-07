import { Proyecto } from 'src/app/models/proyectos.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios:Usuario[] = [];
  proyectos: Proyecto[] = [];
  constructor(public activatedRoute: ActivatedRoute, public http:HttpClient, public router:Router) {
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
   let url = URL_SERVICIOS+'busqueda/todo/'+termino;
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
