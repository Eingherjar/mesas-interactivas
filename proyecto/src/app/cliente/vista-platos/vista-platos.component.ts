import { Component, OnInit,Input,Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-vista-platos',
  templateUrl: './vista-platos.component.html',
  styleUrls: ['./vista-platos.component.scss'],
})
export class VistaPlatosComponent implements OnInit {

  @Output() send_vista_platos= new EventEmitter();
  @Input() config:any;
  
  // datos de los platos activos que aparecen en el menu principal
  data_activos:Array<any>;

  constructor() {}
  
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);

    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case 'platos_activos':
          this.data_activos = this.config.platos
        break;
      }
    }
  }

  select_categorias(){
    this.send_vista_platos.emit({
      event: "select_categorias"
    })
  }

  plato_seleccionado(id){
    this.send_vista_platos.emit({
      event:"plato_seleccionado",
      id:id
    })
    console.log("datos que se mandan para la informacion ",{
      event:"plato_seleccionado",
      id:id
    })
  }
}
