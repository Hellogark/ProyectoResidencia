import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TagInputModule } from 'ngx-chips';
import { MostrarTareaComponent } from './mostrar-tarea/mostrar-tarea.component';
import { NgProgressModule } from '@ngx-progressbar/core';





@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,      
        NgxMyDatePickerModule.forRoot(),
        FormsModule,
        TagInputModule,
        NgProgressModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        DatepickerComponent,
        EditarTareaComponent,
        MostrarTareaComponent,
        

    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        DatepickerComponent,
        EditarTareaComponent,
        MostrarTareaComponent,

        

    ]
})
export class SharedModule { }
