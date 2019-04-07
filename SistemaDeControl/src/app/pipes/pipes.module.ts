import { NgModule } from '@angular/core';
import { ArchivoPipe } from './archivo.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ArchivoPipe,


  ],
  exports:[
    ArchivoPipe
  ]
})
export class PipesModule { }
