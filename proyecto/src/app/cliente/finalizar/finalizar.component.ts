import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.scss']
})
export class FinalizarComponent implements OnInit {

  @Input() config:any;
  @Output() send_vista_finalizar = new EventEmitter();

  // variable que se encarga de mostrar diferentes vistas al cliente
  condicion:String="pedido_confirmado";

  //  se encarga de guardar el id del pedido creado
  id_pedido:number=0;

  // guarda la val
  valoracion:number=0;

  constructor() { }

  ngOnInit(): void {
  }

    // metodo que recibe valores cuando cambia la variable config
  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('config') && this.config) {

      // se cambia la variable config la cual trae datos del componente cliente 
      switch(this.config.event){
        case 'inicio':
          this.id_pedido = this.id_pedido != 0 ? this.id_pedido : this.config.id_pedido;

          if(this.config.estado === 1){
            this.condicion = 'pedido_confirmado'
          }else if(this.config.estado === 2){
            this.condicion = 'pedido_curso'
          }else if(this.config.estado === 3){
            this.condicion = 'calificar_pedido'
          }

          this.confirmar_pedido();

        break;
        
        case 'confirmar_pedido':
          if(this.config.estado === 1){
            this.condicion ="pedido_confirmado";
            this.confirmar_pedido();
     
          }else if(this.config.estado === 2){
            this.condicion ="pedido_curso";
           
          }
          else if(this.config.estado === 3){
            this.condicion = 'calificar_pedido';
          }

        break;


        //  trae la id del pedido para poder calificar el pedido
        case 'calificar': 
        this.condicion = 'calificar_pedido';
        this.id_pedido=this.config.id.id_pedido
        break;
      }

    }
  }


  //  se mandan de manera repetitiva los datos al componente de cliente para que este trae os datos del servidor para verificar el estado del pedido
  confirmar_pedido(){
    setTimeout(() => {
      this.send_vista_finalizar.emit({
        event: 'confirmar_pedido',
        pedido: {
          id_pedido:this.id_pedido
        }
      })
    }, 15000);
  }

  //  metodo que envia a cliente los datos necesarios para calificar el pedido
  valorar_pedido(){
    this.send_vista_finalizar.emit({
      event: 'valorar_pedido',
      valorar:{
        id_pedido: this.id_pedido,
        valoracion: this.valoracion
      }
    })
  }

  //  regresar se encarga de enviar el id del pedido al componente cliente para que este pueda verificar el estado del pedido cada 15 segundos
  //  el estado que se encarga a verificar es del pedido si esta finalizado
  regresar(){
    this.send_vista_finalizar.emit({
      event: 'regresar',
      id:{
        id_pedido:this.id_pedido
      }
    })
  }



}
