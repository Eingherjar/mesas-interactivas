import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  // variables que envian y reciben del componente ciente
  @Input() config:any;

  @Output() send_vista_pedidos = new EventEmitter();

  // recoge los platos que manda el componente informacion al componente  cliente 
  data_recibidos:Array<any>=[];

  // suma el precio taotal de todos los platos añadidos
  precio_total:number=0;

  // valor del precio base de todos los platos que se añadieron
  precio_base:number=0;

  nota:String='';
  constructor() {}
 
  ngOnInit(): void {}

   // metodo que se ejecuta cdada vez que se actualizan lo datos de config  
  ngOnChanges(changes: SimpleChanges) {

   
    if (changes.hasOwnProperty('config') && this.config) {
      switch(this.config.event){
        case 'carrito':
          this.data_recibidos = this.config.datos;

          this.data_recibidos.forEach(element=>{
            this.precio_total += element.precio * element.cantidad;
            this.precio_base += element.precio
          })

        break;

        case 'realizar_pedido':
           this.send_vista_pedidos.emit({
             event:'especificar_pedido',
             platos:this.data_recibidos,
             id_pedido:this.config.id_pedido
           })
        break;

        case 'especificar_pedido':
          this.send_vista_pedidos.emit({
            event: 'terminar_pedido',
            id_pedido:this.config.id_pedido,
            estado:this.data_recibidos[0].estado
          })
          this.data_recibidos= [];
          this.precio_base = 0;
          this.precio_total = 0 
          this.nota = '';        
        break;
      }
    }
  }

  // metodo para eliminar un plato del pedido 
  eliminar_plato(index){
    this.precio_total = this.precio_total - (this.data_recibidos[index].precio * this.data_recibidos[index].cantidad)
    this.precio_base = this.precio_base - this.data_recibidos[index].precio;
    if(this.data_recibidos.length === 1 ){
      this.data_recibidos = []
      this.regresar();
    }else{
      this.data_recibidos.splice(index,1); 
    }

    this.send_vista_pedidos.emit({
      event:"cantidad_platos",
      cantidad:this.data_recibidos.length
    })
  }

  
  //  metodo que se ejecuta cada vez que se añade o se quita cantidades de un plato 
  cambiar_precio_total(index,condicion){
    if (condicion === "sumar"){
      this.precio_total += this.data_recibidos[index].precio

    }else if (condicion === "restar"){
      this.precio_total = this.data_recibidos[index].cantidad >= 1  && this.precio_total > this.precio_base? this.precio_total - this.data_recibidos[index].precio : this.precio_total;
    }
  }

  //  se envia al componente principal hacia donde se va a regresar 
  regresar(){
    this.send_vista_pedidos.emit({
      event:"regresar"
    })
  }

  //  metodo para realizar un pedido 
  realizar_pedido(){
    // recoleccion de los datos del local storage
    let usuario = localStorage.getItem("id_usuario");
    let mesa = localStorage.getItem("id_mesa");
    let pedido = {
    id_usuario: usuario,
    mesa:mesa,
    precio:this.precio_total,
    nota_cocinero:this.nota
    }

    this.send_vista_pedidos.emit({
      event:'realizar_pedido',
      pedido:pedido
    })
  }
}
