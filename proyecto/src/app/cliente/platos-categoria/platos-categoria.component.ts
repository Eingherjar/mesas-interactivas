import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-platos-categoria',
  templateUrl: './platos-categoria.component.html',
  styleUrls: ['./platos-categoria.component.scss']
})
export class PlatosCategoriaComponent implements OnInit {


  // varibales que se envcargan de enviar y recibir datos del componente cliente 
  @Input() config:any;
  @Output() send_vista_categorias = new EventEmitter();

  // datos que recoge los platos que tiene la categoria
  data_categorias:any;

  //  se encarga de recoger el nombre de la categoria que se selecciono
  nombre_categoria:String="";
  constructor() { }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config') && this.config) {
      switch(this.config.event){
        case 'vista_categoria':
          this.data_categorias= this.config.categorias;
          this.nombre_categoria = this.config.nombre
        break;
      }
    }
  }
  
  // se encarga de enviar datos al componente cliente para que traiga todas las imagenes de las categorias que tienee l restaurante 
  select_categorias(){
    this.send_vista_categorias.emit({
      event: "select_categorias"
    })
  }

  // se encarga de trer todos los datos del plato seleccionado 
  plato_selccionado(id){
    this.send_vista_categorias.emit({
      event:"plato_seleccionado",
      id:id
    })
  }

}
