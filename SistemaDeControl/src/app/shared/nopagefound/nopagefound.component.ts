import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
declare function init_plugins();
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {
  anio: number = new Date().getFullYear();
  constructor( public _location:Location) { }

  ngOnInit() {
     init_plugins();
  }
volver(){
  this._location.back();

}
}
