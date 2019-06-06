import { RouterModule, Routes } from '@angular/router';
import { VerificaTokenGuard } from '../services/service.index';
import { AdminGuard } from './../services/guards/admin.guard';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { MisTareasComponent } from "./mis-tareas/mis-tareas.component";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { VerTodosProyectosComponent } from './ver-todos-proyectos/ver-todos-proyectos.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';



const PAGESROUTES: Routes = [
    //Nota: Rutas que tengan AdminGuard, solo podrán ser accesadas por los administradores
            //Rutas generales
            { path: 'inicio', component: DashboardComponent, data: { titulo: 'Inicio' }, 
                canActivate: [VerificaTokenGuard]},
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Configuración de la interfaz' },
                canActivate: [VerificaTokenGuard] },            
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'},
            canActivate: [VerificaTokenGuard]},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'},           
            canActivate:[AdminGuard,VerificaTokenGuard]},
            
            //Usuarios
            {path: 'ver-usuarios', component: UsuariosComponent, data:{titulo: 'Ver todos los usuarios'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            {path: 'ver-usuarios/:termino', component: UsuariosComponent, data:{titulo: 'Usuario Seleccionado'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            //Proyecto            
            {path: 'verProyecto/:id', component:VerProyectoComponent,data:{titulo: 'Ver proyecto'},canActivate: [VerificaTokenGuard]},
            {path: 'ver-proyectos', component: VerTodosProyectosComponent, data:{titulo: 'Ver todos los proyectos'},
             canActivate:[AdminGuard,VerificaTokenGuard]},
            {path: 'editarProyecto/:id', component: EditarProyectoComponent, data:{titulo: 'Editar Proyecto'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            { path: 'misproyectos', component: MisProyectosComponent, data: { titulo: 'Proyectos en los que participo' }, 
            canActivate: [VerificaTokenGuard]},     
            { path: 'nuevoProyecto', component: CrearProyectoComponent, data: { titulo: 'Crear Nuevo Proyecto' }, 
            canActivate:[AdminGuard,VerificaTokenGuard] },
            //Tareas
            { path:'mistareas', component: MisTareasComponent, data: {titulo: 'Mis tareas '}, canActivate: [VerificaTokenGuard] },
            {path: 'todas-tareas/:id', component: ListaTareasComponent,data:{titulo: 'Tareas del proyecto'},
            canActivate: [AdminGuard,VerificaTokenGuard]},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '**', component: NopagefoundComponent}
            
        ];


export const PAGES_ROUTES = RouterModule.forChild( PAGESROUTES );
