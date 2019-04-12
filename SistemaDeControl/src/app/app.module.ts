import { PagesComponent } from './pages/pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import {SharedModule} from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';


//PipeModule
import { PipesModule } from './pipes/pipes.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    EditarTareaComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    PipesModule,
    SharedModule, 
    BrowserAnimationsModule
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
