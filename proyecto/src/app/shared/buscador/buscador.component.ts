import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent implements OnInit {

  @Input() config:any;
  @Output() buscador = new EventEmitter();

  contador:number=0;
  platos_añadidos:Array<any>=[];
  constructor() {}
 
  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('config') && this.config) {

      switch(this.config.event){
        case "añadir":
            if (this.platos_añadidos.length == 0){
              this.platos_añadidos.push(this.config.datos);
              this.contador++;
            }else{
              for (let i =0; i<this.platos_añadidos.length ; i++){
                let incluido = this.platos_añadidos[i].id_plato === this.config.datos.id_plato ? true : false ;
                
                if(incluido === true){
                  this.platos_añadidos[i]=this.config.datos
                  i = this.platos_añadidos.length;
                  break;
                }

                if((i === this.platos_añadidos.length - 1) && (incluido === false)){
                  this.platos_añadidos.push(this.config.datos);
                  this.contador++;
                }
              }
            }
        break;
      
        case 'cantidad_platos':
            this.contador = this.config.cantidad
            
            this.platos_añadidos = this.contador === 0 ? [] : this.platos_añadidos;
        break; 
      
        case 'terminar_pedido':
          this.contador = 0;
          this.platos_añadidos=[] 
        break;
      }
    }
  }

  enviar(){
    this.buscador.emit({
      event:"carrito",
      datos:this.platos_añadidos
    })
  }
  
}
