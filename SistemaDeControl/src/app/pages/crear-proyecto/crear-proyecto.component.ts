import { Router } from '@angular/router';
  import { Component, OnInit } from '@angular/core';

  import { FormGroup, FormControl, Validators } from "@angular/forms";
  import { Proyecto } from 'src/app/models/proyectos.model';
  import { UsuarioService, ProyectoService } from 'src/app/services/service.index';
  import { Usuario } from 'src/app/models/usuario.model';


  @Component({
    selector: 'app-crear-proyecto',
    templateUrl: './crear-proyecto.component.html',
    styleUrls: ['./crear-proyecto.component.css']
  })
  export class CrearProyectoComponent implements OnInit {
      formProyecto: FormGroup;
      usuario: Usuario;
      proyecto:Proyecto;
    constructor(public _usuarioService: UsuarioService, public _proyectoService: ProyectoService, public router: Router) { }

    ngOnInit() {
      this.usuario = this._usuarioService.usuario;
      this.formProyecto = new FormGroup({
        nombre: new FormControl(null,Validators.required ),
        descripcion: new FormControl (null,Validators.required),
        empresa: new FormControl(null, Validators.required),
       
      });
    }
    crearProyecto(){
      if(this.formProyecto.invalid){return;}
      if(this.formProyecto.valid){}
      let fecha = new Date();
      this.proyecto = new Proyecto(
       this.formProyecto.value.nombre ,
        this.formProyecto.value.descripcion ,
        this.usuario._id ,
        this.formProyecto.value.empresa ,
        '',
      );
        this._proyectoService.crearProyecto(this.proyecto, this.usuario._id).subscribe(res =>{
        });
    }

  }
