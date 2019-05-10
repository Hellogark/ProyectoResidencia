import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { ProyectoService } from './../../services/proyectos/proyecto.service';
import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from 'src/app/models/proyectos.model';
import { Usuario } from 'src/app/models/usuario.model';
import  Swal  from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-ver-todos-proyectos',
  templateUrl: './ver-todos-proyectos.component.html',
  styleUrls: ['./ver-todos-proyectos.component.css']
})
export class VerTodosProyectosComponent implements OnInit {
  proyectos: Proyecto[];
  participantes:Usuario[];
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
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
  constructor(public _proyectoService:ProyectoService, public _usuarioService:UsuarioService, public router:Router) { }

  ngOnInit() {
    this.cargarProyectos();
   
  }
  cargarProyectos(){
    this._proyectoService.cargarProyectos()
    .subscribe( (res:any) =>{
     
     this.proyectos = res.proyectos;
     this.participantes = res.proyectos.participantes;
     console.log(this.proyectos);
     this.cargando=false;
 });
 }
  eliminarProyecto(proyectoBorrar:Proyecto){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el proyecto: '+proyectoBorrar.nombre+'?',      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._proyectoService.eliminarProyecto(proyectoBorrar._id)
        .subscribe(res =>{
          this.cargarProyectos();
         
        });
       
      }
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




