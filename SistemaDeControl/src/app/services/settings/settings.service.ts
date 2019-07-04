import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };
  //@inject(DOCUMENT) sirve para obtener todo el DOM del index
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // Guardad ajustes en localStorage
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes )  );
  }

  cargarAjustes() {

    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );     

      this.aplicarTema( this.ajustes.tema );

    } else {     
      this.aplicarTema( this.ajustes.tema );
    }

  }

  aplicarTema( tema: string ) {

    
    const URL = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', URL );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = URL;

    this.guardarAjustes();

  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
