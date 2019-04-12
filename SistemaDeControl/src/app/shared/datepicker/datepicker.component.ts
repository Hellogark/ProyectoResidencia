import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import {INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyOptions, NgxMyDatePickerDirective} from 'ngx-mydatepicker';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() fecha: string;
  @Output() fechaSeleccion: EventEmitter<String> = new EventEmitter();
  @ViewChild('dp') ngxdp: NgxMyDatePickerDirective;
  fechaInput: any;
  arreglo: string []= [];
  private fechaInicial = new Date();
  public dia = this.fechaInicial.getDate();
  private mes = this.fechaInicial.getMonth();
  private anio = this.fechaInicial.getFullYear();
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/m/yyyy',
    dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    markCurrentDay: true,
    openSelectorTopOfInput: false,
    focusInputOnDateSelect: true,
    disableUntil: {year: 0, month: 0, day:0}
   
};


private validDate: boolean = false;
private inputText: string = "";
 
  constructor() {  
  }

  ngOnInit() {
    if(this.fecha == '' || this.fecha == undefined|| this.fecha == null){console.log(this.fecha);return;   }
    let dia = this.fecha.split('/')[0];
    let mes = this.fecha.split('/')[1];
    let anio = this.fecha.split('/')[2];
    console.log(this.dia);
      this.fechaInput = {date: { year: anio, month: mes, day: dia}};   
      this.disableUntil();
    }
  

  clearDate(): void {
    this.ngxdp.clearDate();
}
onDateChanged(event: IMyDateModel): void {
  console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  if(event.formatted !== '') {
      this.validDate = true;
      this.inputText = event.formatted;
      this.fechaSeleccion.emit(event.formatted.toString());
  }
 
}

onInputFieldChanged(event: IMyInputFieldChanged): void {
  console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  this.validDate = event.valid;
  this.inputText = event.value;
  this.fechaSeleccion.emit(event.value.toString());

}
disableUntil() {
  let d: Date = new Date();
  d.setDate(d.getDate() - 1);
  let copy = this.getCopyOfOptions();
  copy.disableUntil = {year: d.getFullYear(), 
                       month: d.getMonth() + 1, 
                       day: d.getDate()};
  this.myOptions = copy;
}

// Returns copy of myOptions
getCopyOfOptions(): IMyOptions {
  return JSON.parse(JSON.stringify(this.myOptions));
}
}
