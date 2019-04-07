import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { AdminGuard } from './../services/guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { ProfileComponent } from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {VerTodosProyectosComponent} from './ver-todos-proyectos/ver-todos-proyectos.component';
import {EditarProyectoComponent} from './editar-proyecto/editar-proyecto.component';
import { VerificaTokenGuard } from '../services/service.index';




const pagesRoutes: Routes = [
   
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, 
                canActivate: []
                },
            {path: 'verProyecto/:id', component:VerProyectoComponent,data:{titulo: 'Ver proyecto'}},
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Configuración de la cuenta' } },            
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
            { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'},           
            canActivate:[AdminGuard,VerificaTokenGuard]},
            
            //Mantenimientos
            {path: 'ver-usuarios', component: UsuariosComponent, data:{titulo: 'Ver todos los usuarios'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            {path: 'ver-usuarios/:termino', component: UsuariosComponent, data:{titulo: 'Usuario Seleccionado'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            //Proyecto
            {path: 'ver-proyectos', component: VerTodosProyectosComponent, data:{titulo: 'Ver todos los proyectos'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            {path: 'editarProyecto/:id', component: EditarProyectoComponent, data:{titulo: 'Editar Proyecto'},
            canActivate:[AdminGuard,VerificaTokenGuard]},
            { path: 'misproyectos', component: MisProyectosComponent, data: { titulo: 'Proyectos en los que participo' } },
            { path: 'nuevoProyecto', component: CrearProyectoComponent, data: { titulo: 'Crear Nuevo Proyecto' }, 
            canActivate:[AdminGuard,VerificaTokenGuard] },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
           /*  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' } */
        ];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
