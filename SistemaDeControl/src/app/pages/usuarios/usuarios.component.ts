import { ActivatedRoute } from '@angular/router';
import  Swal  from 'sweetalert2';
import { UsuarioService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PaginationInstance } from 'ngx-pagination';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ['./usuarios.component.css'] 
  
})
export class UsuariosComponent implements OnInit {
  usuarios:Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  encontrado: boolean;
  termino: string;
  public maxSize: number = 6;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
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




  constructor(public  _usuarioService:UsuarioService, public _modalUploadService: ModalUploadService,
    public activatedRoute: ActivatedRoute) { 
      activatedRoute.params.subscribe( params =>{
        if(params['termino'] == '' || params['termino'] <0){return;}
        this.termino = params['termino'];
        if(this.termino != undefined){
           window.onload = () =>this.buscarUsuario(this.termino);
        }
       
      });
    
  }

  ngOnInit() {         
    this.cargarUsuario();
    this._modalUploadService.notificacion.subscribe( res =>{
      this.cargarUsuario();
    });
   
    
   
  }
  cargarUsuario(){
   
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde,this._usuarioService.token)
    .subscribe( (res:any) =>{
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false;
     
       

    });
  }

  buscarUsuario(termino: string){
    console.log(termino);
    if(termino == ''){this.cargarUsuario(); return;}
  
    this.encontrado = true;
    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios:Usuario[]) =>{
      console.log(usuarios);
      
      this.usuarios = usuarios;
     
      if(termino =='' || this.usuarios.length<=0){this.encontrado = false; 
        }
      
    });
  }

  borrarUsuario(usuarioBorrar:Usuario){
    console.log(usuarioBorrar);
    if(usuarioBorrar._id === this._usuarioService.usuario._id){
      Swal.fire(
        'No puedes borrar este usuario',
        'No puedes borrarte a ti mismo',
        'error');
      return;
    }
    Swal.fire({
      title: 'Estás seguro que deseas eliminar a '+usuarioBorrar.nombre+'?',      
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result) {
        this._usuarioService.borrarUsuario(usuarioBorrar._id)
        .subscribe(res =>{
          this.cargarUsuario();
         
        });
       
      }
    });

  }
  guardarUsuario(usuario:Usuario){
    console.log(usuario)
    this._usuarioService.actualizarUsuarios(usuario)
    .subscribe(res =>{
      console.log(res);
    });

  }
  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios',id);

  }


  

}
