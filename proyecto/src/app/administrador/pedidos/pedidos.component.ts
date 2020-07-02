import { Component, OnInit,Input,Output,EventEmitter, SimpleChanges } from '@angular/core';
import { delay } from 'rxjs/Operators';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  // varibales para enviar y recibir datos del componente administrador
  @Output() send_pedidos = new EventEmitter();
  @Input() config:any;

  // variables encargadas de recoger los datos de los pedidos
  data_activos:Array<any>=[];
  data_en_curso:Array<any>=[];
  data_finalizados:Array<any>=[];

  // variable que recoge los datos del pedido seleccionado
  data_seleccion_pedido:Array<any>=[];
  seleccion:any;

  constructor() { }

  ngOnInit(): void {
    // inicializacion del componente pedido
    this.data_seleccion_pedido=[];
    this.seleccion={};

    // este metodo se lanza al inicio para que repita la peticion de los pedidos activos cada 15 segundos despues del inicio
    this.prueba_repeticion();
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("simple changes", changes);

    if (changes.hasOwnProperty('config') && this.config) {

      // este switch se encarga de hacer una validacion de los datos que recoge del componente padre
      switch(this.config.event){

        case 'pedidos_activos':
          // se reciben todos los datos de los pedidos activos de parte de administrador cada ves que en el menu se de click a pedidos 
          this.data_activos = this.config.activos;
          console.log("datos_activos",this.data_activos);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;  

        case 'pedidos_en_curso':
           // se reciben todos los datos de los pedidos en curso de parte de administrador cada ves que en el menu se de click a pedidos 
          this.data_en_curso = this.config.encurso;
          console.log("datos_en_curso",this.data_en_curso);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'pedidos_finalizados':
           // se reciben todos los datos de los pedidos finalizados de parte de administrador cada ves que en el menu se de click a pedidos 
          this.data_finalizados = this.config.finalizados;
          console.log("datos_finalizados",this.data_finalizados);
          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'pedido_seleccionado': 
          // se recoge la informacion del pedido que manda administrador para mostrar la informacion de ese pedido al usuario
          this.data_seleccion_pedido = this.config.pedido;
        break;

        case 'confirmar_pedidos_activos':
          // entra en esta condicion cuando se ha confirmacdo un pedido y el servidor retorna que el pedido se ha confirmado 
          this.data_en_curso.push(this.data_activos[this.seleccion.index]);
          
          // eliminar el pedido que esta en activos para ponerlo en pedidos en curso
          if(this.data_activos.length === 1){
            this.data_activos =[];
          }else{
            this.data_activos.splice(this.seleccion.index,1);
          }

          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;

        case 'finalizar_pedidos_cursos':
          // en esta condicion se  el pedido que se finalizo al array que contiene los pedidos finalizados 
          this.data_finalizados.push(this.data_en_curso[this.seleccion.index]);

          if(this.data_en_curso.length === 1){
            this.data_en_curso =[];
          }else{
            this.data_en_curso.splice(this.seleccion.index,1);
          }

          this.data_seleccion_pedido=[];
          this.seleccion={};
        break;
      
        case 'actualizacion_pedidos': 
        // en esta condicion siempre entra cada vez que se hace la petidicion de repetir los pedidos activos
        this.data_activos = this.config.activos;
        this.prueba_repeticion();
        break;
      }
    }
  }


// en este metodo se recogen los datos del pedido seleccionado y se mandan los datos 
  pedido_seleccionado(id,index,condicion){

    // se restaura todos los datos de la especificacion del pedido anterior 
    this.data_seleccion_pedido=[];

    // se envia los datos al componente administrador para que ejecute el servicio de la informacion de un pedido
    this.send_pedidos.emit({
      event:'pedido_seleccionado',
      id:id
    })
    //  se restaura los datos del pedido seleccionado
    this.seleccion=[];
    // entra en alguna de las condiciones las cuales le añade a seleccion todos los datos del pedido seleccionado (no de la especificacion del pedido)
    if (condicion === 'activos'){
       this.seleccion = {
         pedido: this.data_activos[index],
         index: index,
         condicion:condicion
       }
    }else if(condicion === 'curso'){
      this.seleccion ={
        pedido:  this.data_en_curso[index],
        index:index,
        condicion:condicion
      }

    }else if (condicion === 'finalizados'){
      this.seleccion ={
        pedido: this.data_finalizados[index],
        index:index,
        condicion:condicion
      }
    }
  }

  // metodo para pasar un  pedido de estado activo en curso y de en curso a finalizado
  confirmar_pedido(){
    // por ahora nada mas para los pedidos activos
    // la primara condicion es para ver si el pedido tiene un plato asignado
    if(this.data_seleccion_pedido.length > 0){
      // se verifica en cual condicion entro el usuario 
      if(this.seleccion.condicion === 'activos'){
        // se crea la variable pedido la cual es la que va a contener lo que necesita el servicio para poder mandar la peticion al servidor
        let pedido={
          id_pedido: this.seleccion.pedido.id_pedido
        }
        // se envia los datos necesarios al componente de administrador para que este ejecute el servicio
        this.send_pedidos.emit({
          event:'confirmar_pedido',
          pedido:pedido
        })
      }

      else if (this.seleccion.condicion === 'curso'){
        let pedido={
          id_pedido: this.seleccion.pedido.id_pedido
        }
        this.send_pedidos.emit({
          event:'finalizar_pedido',
          pedido:pedido
        })
      }
    }else{
      console.log("error al confirmar el pedido")
    }
  }

  // metodo que se encarga de realizar siempre el envio de datos al componente administrador de los pedidos activos
  prueba_repeticion(){
    // se hace que se espere 15 segundos para ejecutar lo que esta dentro 
   setTimeout(() => {
    this.send_pedidos.emit({
      event:'actualizacion_pedidos'
    })
    console.log("entro en la repeticion");
   }, 15000);
  }
}
