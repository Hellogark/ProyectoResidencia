import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta
              
               ) {
                //Actualizar meta tag para generar el breadcrumb
    this.getDataRoute()
    .subscribe( data => {
      
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag( metaTag );


    });

  }

  ngOnInit() {
  }
  //Filtrar los eventos de la página para obtener los datos 
  getDataRoute() {
    return this.router.events.pipe(

      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd ) => evento.snapshot.data )

    );
  }

}
