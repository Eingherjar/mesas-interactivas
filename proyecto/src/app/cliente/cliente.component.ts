import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-cliente',
  templateUrl:'./cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  id_mesa:number;

  vista_components:string="vista platos";

  config_vista_platos:any;

  config_vista_vendidos:any;

  config_vista_categoria:any;

  config_vista_informacion:any;

  config_vista_pedidos:any;

  config_buscador:any;

  config_vista_finalizar:any;
  
  private notifier: NotifierService;

  constructor(private router_url: ActivatedRoute, private service: ClienteService, notifier:NotifierService) {this.notifier = notifier }

  ngOnInit(): void {
    this.id_mesa = parseInt(this.router_url.snapshot.paramMap.get('mesa'));

    this.service.Listado_Platos().subscribe((data:any)=>{
      if(data.estado === 'success'){
        
        this.config_vista_platos={
          event: 'platos_activos',
          platos: data.plato
        }

      }
      else if(data.estado === 'error'){
        this.notifier.notify("error","error al traer el listado de platos");
      }
    })
  }


  events_vista_platos(e){

    switch(e.event){

      case 'platos_activos': 
        this.service.Listado_Platos().subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_vista_platos={
              event: 'platos_activos',
              platos: data.pedidos
            }

          }
          else if(data.estado === 'error'){
            this.notifier.notify("error","error al traer el listado de platos");
          }
        })
      break;

      case 'select_categorias':
        this.vista_components ="vista vendidos";
        this.service.Imagenes_Categorias().subscribe((data:any)=>{
          console.log("datos que trae el servicio de imagenes_categorias",data);
          this.config_vista_vendidos = {
            event:"imagen_categorias",
            categorias:data
          }  
        })
        
      break;

      case 'plato_seleccionado': 

      this.vista_components ="vista informacion";
      let plato ={
        id_plato: e.id
      }
      this.service.Mostrar_Plato(plato).subscribe((data:any)=>{
        if(data.estado === 'success'){
          this.config_vista_informacion={
            event:"plato_seleccionado",
            plato: data.plato ,
            lugar:"principal"
          }
        }

        else if(data.estado === 'error'){
          this.notifier.notify("error","ha ocurrido un erro al mostar los detalles del plato");
          console.log("error al mostar el detalle de un plato",data);
        }
      })

      break;
    }
  }

  events_vista_vendidos(e){
    switch(e.event){
      case 'regresar_menu':
         this.vista_components ='vista platos';
      break;

      case 'seleccion': 
        console.log("datos que trae la seleccion de la categoria",e);
        let id ={
          id_categoria:e.seleccion
        }
        this.service.Categorias_Id(id).subscribe((data:any)=>{
          
          if(data.estado === "success"){
            this.vista_components = "vista platos categorias";
            this.config_vista_categoria={
              event:"vista_categoria",
              categorias: data.plato,
              nombre:e.nombre
            }
          } 
          else if(data.estado === "error"){
            this.notifier.notify("error",data.error ? data.error.mensaje : "no se pueden cargar los platos de la categoria");
            console.log("error en las categorias individuales",data);

          }
        })
      break;  
    }
  }

  events_vista_categorias(e){
    switch(e.event){
      case 'select_categorias':
        this.vista_components ="vista vendidos";
        this.service.Imagenes_Categorias().subscribe((data:any)=>{
          console.log("datos que trae el servicio de imagenes_categorias",data);
          this.config_vista_vendidos = {
            event:"imagen_categorias",
            categorias:data
          }  
        })
        
      break;

      case 'plato_seleccionado':
        this.vista_components ="vista informacion";
        let plato ={
          id_plato: e.id
        }
        this.service.Mostrar_Plato(plato).subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_vista_informacion={
              event:"plato_seleccionado",
              plato: data.plato,
              lugar:"categorias" 
            }
          }

          else if(data.estado === 'error'){
            this.notifier.notify("error","ha ocurrido un erro al mostar los detalles del plato");
            console.log("error al mostar el detalle de un plato",data);
          }
        })
      break;
    }
  }

  events_vista_informacion(e){
    switch(e.event){
      case 'regresar':
        console.log("datos que trae el event",e.destino);
      this.vista_components = e.destino === "principal " ? "vista platos" : e.destino === "categorias"  ? "vista platos categorias" : "vista platos";
      break;

      case 'agregar_carro':
        console.log("entro en la condicion de agregar carro");
        this.config_buscador={
          event:"añadir",
          datos: e.envio
        } 
      break;
    }
  }

  events_buscador(e){
    switch(e.event){
      case 'carrito':
        this.vista_components = 'vista pedidos';
        this.config_vista_pedidos = {
          event:"carrito",
          datos: e.datos
        }
      break;
    }
  }

  events_vista_pedidos(e){
    switch(e.event){

      case 'cantidad_platos':
        this.config_buscador={
          event:"cantidad_platos",
          cantidad:e.cantidad
        } 
      break;

      case 'realizar_pedido':
         this.service.Realizar_Pedido(e.pedido).subscribe((data:any)=>{
           this.notifier.notify("info","Se esta realizando el pedido porfavor espere");
           this.config_vista_pedidos={
             event:'realizar_pedido',
             id_pedido:data.pedido.id_pedido
           }
         })
      break;

      case 'especificar_pedido':
          for(let i=0 ; i < e.platos.length ; i++ ){
            let pedido = {
              id_pedido: e.id_pedido,
              id_plato:e.platos[i].id_plato,
              cantidad:e.platos[i].cantidad
            }

            this.service.Especificar_Pedido(pedido).subscribe((data:any)=>{
              console.log("datos del pedido especificado",data);
            })

            if(i === e.platos.length - 1){
              this.notifier.notify("success","Se ha procesado el pedido satisfactoriamente");
              this.config_vista_pedidos={
                event: 'especificar_pedido',
                id_pedido: e.id_pedido
              }
            }
          } 
      break;

      case 'terminar_pedido': 
          this.config_buscador={
            event: e.event
          }
          this.config_vista_finalizar={
            event:'inicio',
            id_pedido:e.id_pedido,
            estado:e.estado
          }
          this.vista_components ="vista finalizar";

      break;
      case 'regresar':
        this.vista_components ="vista platos" ;
      break;
    }
  }

  events_vista_finalizar(e){
   switch(e.event){
    case 'regresar': 
      this.vista_components = 'vista platos';
      this.confirmar_pedido(e.id)
    break;

    case 'confirmar_pedido': 
      this.service.Mostrar_Informacion_Pedido(e.pedido).subscribe((data:any)=>{
        if (data.estado === 'success'){
          this.config_vista_finalizar ={
            event:'confirmar_pedido',
            estado:data.pedido[0].estado
          }
        }
        else{
          console.log("algo ha ocurrido al mostrar la informacion del pedido en la vista finalizar");
        }
      })
    break;

    case 'valorar_pedido':
      this.service.Valorar_Pedido(e.valorar).subscribe((data:any)=>{
        if(data.estado === 'success'){
          this.notifier.notify("success","Pedido valorado satisfactoriamente");
          this.vista_components = 'vista platos'; 
        }else if (data.estado === 'error'){
          this.notifier.notify("error","ha ocurrido un error al valorar su pedid, por favor intente nuevamente");
          console.log("error al valorar un pedido",data);
        }
      })
     
    break;
   }
  }


  confirmar_pedido(id){
    setTimeout(() => {
      this.service.Mostrar_Informacion_Pedido(id).subscribe((data:any)=>{
        if(data.pedido[0].estado !== 3){

          this.confirmar_pedido(id);
          
        }else if (data.pedido[0].estado === 3){
          
          this.config_vista_finalizar={
            event:'calificar',
            estado: data.pedido[0].estado,
            id:id
          }

          this.vista_components='vista finalizar';
        }

        console.log("entro en la condicion de el confirmar pedido de cliente",data);
      })
    }, 15000);
  }
}
