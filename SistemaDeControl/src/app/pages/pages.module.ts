
import { CommonModule } from '@angular/common';
import { PipesModule } from './../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule} from '../shared/shared.module';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// ng2-charts

import { DashboardComponent } from './dashboard/dashboard.component';




// temporal
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VerTodosProyectosComponent } from './ver-todos-proyectos/ver-todos-proyectos.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { MisTareasComponent } from './mis-tareas/mis-tareas.component';

//librerias
import { TagInputModule } from 'ngx-chips';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component'; 
import { FileUploadModule } from "ng2-file-upload";
import { NgProgressModule } from '@ngx-progressbar/core';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
    declarations: [
       
        DashboardComponent,
        AccoutSettingsComponent,        
        MisProyectosComponent,
        CrearProyectoComponent,
        ProfileComponent,
        UsuariosComponent,
        VerTodosProyectosComponent,
        EditarProyectoComponent,
        BusquedaComponent,
        VerProyectoComponent,
        ListaTareasComponent,
        MisTareasComponent,
        
        
        
      
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,     
        ReactiveFormsModule,
        PipesModule,
        NgxPaginationModule,
        TagInputModule, 
        FileUploadModule,
        NgProgressModule,
        ImageCropperModule
        
        
        
    ]
})
export class PagesModule { }
