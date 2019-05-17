import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Proyecto } from 'src/app/models/proyectos.model';
import { UsuarioService, ProyectoService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import {DataTableModule} from "angular-6-datatable-cc";


@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  constructor( public _usuarioService:UsuarioService, public _proyectoService:ProyectoService) { }
  proyectos: Proyecto[];
  participantes:Usuario[];
  data: any;
  dataProyectos: any [] = [];
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  idUsuario = this._usuarioService.usuario._id;
  desde: number = 0;
  encontrado:boolean;
  cargando:boolean = true;

  public config: PaginationInstance = {
   
    itemsPerPage: 10,
    currentPage: 1
};

  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  
  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }
  ngOnInit() {
    this.misProyectos();
    
  }

  misProyectos(){
    this._proyectoService.misProyectos(this.idUsuario)
    .subscribe(( res:any) =>{
      this.proyectos = res.proyectos;
      this.proyectos.forEach(proyecto => {
        this.data = {
          _id: proyecto._id,
          nombre: proyecto.nombre,
          nombreEmpresa:proyecto.nombreEmpresa,
          fechaCreacion:proyecto.fechaCreacion,
          fechaProyectada: proyecto.fechaProyectada, 
          participantes:   proyecto.participantes      
        }
          
        this.dataProyectos.push(this.data);
      });      
      console.log(res);
      this.cargando=false;
    });
  }
  buscarProyecto(termino: string){
    console.log(termino);
    if(termino ==''){return;}
    this.encontrado = true;
    this._proyectoService.buscarProyectos(termino)
    .subscribe((proyectos:Proyecto[]) =>{
      console.log(proyectos);
      
      this.proyectos = proyectos;
     
      if(termino =='' || this.proyectos.length<=0){this.encontrado = false; 
        }
      
    });
  }

}
