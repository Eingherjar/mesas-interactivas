import { Component, OnInit } from '@angular/core';
import { AdministradorService } from "./administrador.service";
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  // datos que se envian al componente plato
  config_plato:any={};

  // datos que se envian al compnente pedidos
  config_pedidos:any={};
  //  variabklle para condiciones de vistra del componente plato
  config_vista_plato: String = 'menu_principal';

  // con esta variable se hace la condicion de cual es la vita que se verá actualmente en la pagina 
  display_components: String = 'menu';

  private notifier: NotifierService;

  constructor(private service: AdministradorService, notifier: NotifierService, private router: Router) { this.notifier = notifier }


  ngOnInit(): void {
    // listado de platos disponibles
    this.service.Listado_Platos().subscribe((data: any) => {
      if (data.estado === 'success') {

        this.config_plato = {
          event: 'listado_platos',
          platos: data.plato,
        }

      } else if (data.estado === 'error') {
        this.notifier.notify("error", "Ha ocurrido un error al traer los platos disponibles", data);
      }
    });

    // listado de platos no disponibles
    this.service.Listado_no_Dispopnibles().subscribe((data: any) => {
      if (data.estado === 'success') {
        this.config_plato = {
          event: 'platos_no_disponibles',
          platos: data.plato,
        }

      } else if (data.estado === 'error') {
        this.notifier.notify("error", "Ha ocurrido un error al traer los platos no disponibles", data);
      }
    });
  }

  // datos que recibe del componente menu
  events_menu(e) {
    console.log("entro en el evento del menu", e.event);
    //  cada vez que entra a este metodo se encarga de recvcibir los datos del componente menu y hacer las solicitudes a la api por medio del servicio
    switch (e.event) {
      case 'menu':
        this.service.Listado_Platos().subscribe((data: any) => {
          if (data.estado === 'success') {
            this.config_plato = {
              event: 'listado_platos',
              platos: data.plato,
            }
          } else if (data.estado0 === 'error') {
            this.notifier.notify("error", "Ha ocurrido un error al traer los platos disponibles", data);
          }
        });

        // listado de platos no disponibles
        this.service.Listado_no_Dispopnibles().subscribe((data: any) => {
          if (data.estado === 'success') {
            this.config_plato = {
              event: 'platos_no_disponibles',
              platos: data.plato,
            }

          } else if (data.estado === 'error') {
            this.notifier.notify("error", "Ha ocurrido un error al traer los platos no disponibles", data);
          }
        });

        this.display_components = e.event;
        this.config_vista_plato = 'menu_principal';
        break;

      case 'mesas':
        this.display_components = e.event;

        break;

      case 'pedidos':
        this.display_components = e.event;

        // pedidos activos 
        this.service.Mostrar_Pedidos_Realizados().subscribe((data:any)=>{
          if(data.estado === "success" ){
            this.config_pedidos={
              event:"pedidos_activos",
              activos:data.pedidos            
            }
          } 
          else if (data.estado === "error"){
            console.log("error al traer los datos del pedido",data); 
          }
        });

        // pedidos en curso
        this.service.Mostrar_Pedidos_EnCurso().subscribe((data:any)=>{
          if(data.estado === "success" ){
            this.config_pedidos={
              event:"pedidos_en_curso",
              encurso:data.pedidos            
            }
          } 
          else if (data.estado === "error"){
            console.log("error al traer los datos del pedido",data); 
          }
        });

        // pedidos finalizados
        this.service.Mostrar_Pedidos_Finalizados().subscribe((data:any)=>{
          if(data.estado === "success" ){
            this.config_pedidos={
              event:"pedidos_finalizados",
              finalizados:data.pedidos            
            }
          } 
          else if (data.estado === "error"){
            console.log("error al traer los datos del pedido",data); 
          }
        });
        break;

      case 'cerrar':
        localStorage.setItem("id_usuario", "null");
        this.router.navigate(['/login/'+Math.floor(Math.random() * (20 - 1)) + 1]);
        break;
    }
  }
 
  // datos que recibe del componente plato
  events_plato(e) {
    //  cada vez que entra a este metodo se encarga de recvcibir los datos del componente plato y hacer las solicitudes a la api por medio del servicio
    switch (e.event) {

      case 'crear_plato':

        this.service.Crear_Platos(e.data).subscribe((data: any) => {
          if (data.estado === 'success') {
            this.notifier.notify("success", "Plato creado satisfactoriamente");
            console.log("datos del plato ", data);

            this.config_plato = {
              event: 'crear_plato',
              data: data
            }
          }
          else if (data.estado === 'error') {
            this.notifier.notify("error", "Error al crear el plato");
            console.log("datos del plato ", data);
          }
        });
        break;

      case 'agregar_categoria':
        for (let i = 0; i < e.ciclo.length; i++) {
          let data = {
            id_plato: e.id_plato,
            id_categoria: e.ciclo[i]
          }
          console.log("datos que manda para la peticion de añadir categorias al plato", data);
          this.service.Agregar_Categorias_Plato(data).subscribe((data: any) => {
            console.log("datos que se muestran ", data);

            if (i == e.ciclo.length - 1) {
              this.notifier.notify("success", "se ha añadido todas las categorias al plato");
              this.config_plato = {
                event: e.case === "crear" ? 'agregado_plato' : 'modificado_plato'
              }
              console.log("enveto mandado desde agregar categoria",e.case);
            }
          });
        }

      break;

      case 'traer_categorias':
        this.service.Listado_Categorias_Platos(e.data).subscribe((data:any)=>{
          if(data.estado === "success"){
            this.config_plato={
              event: 'traer_categorias',
              categorias:data.categortias
            }

          }else if(data.estado === "error"){
            this.notifier.notify("error",data.error.mensaje);
          }
        })
      
      break;

      case 'mostrar_plato':
        this.service.Mostrar_Plato(e.data).subscribe((data:any)=>{
          if(data.estado === "success"){
            this.config_plato={
              event: 'mostrar_plato',
              plato:data.plato
            }

          }else if(data.estado === "error"){
            this.notifier.notify("error",data.error.mensaje);
          }
        })

      break;

      case 'modificar_plato':
        this.service.Modificar_platos(e.data).subscribe((data:any)=>{
          if (data.estado === 'success') {
            this.notifier.notify("success", "Plato modificado satisfactoriamente");
            console.log("datos de la modificacion del plato ", data);
            this.config_plato = {
              event: 'modificar_plato' 
            }
          }
          else if (data.estado === 'error') {
            this.notifier.notify("error", data.error.mensaje ? data.error.mensaje : "Error al modificar el plato");
            console.log("datos de la modificacion del plato", data.error.mensaje ? data.error.mensaje : "Error al modificar el plato");
          }
        }) 
      break;

      case 'mensaje':
        this.notifier.notify(e.tipo, e.mensaje);
        break;
    }
  }
   
  // datos que recibe del componente pedidos
  events_pedidos(e){
      //  cada vez que entra a este metodo se encarga de recvcibir los datos del componente menu y hacer las solicitudes a la api por medio del servicio
    switch(e.event){

      case 'actualizacion_pedidos': 
      this.service.Mostrar_Pedidos_Realizados().subscribe((data:any)=>{
        if(data.estado === "success" ){
          this.config_pedidos={
            event:"actualizacion_pedidos",
            activos:data.pedidos            
          }
        } 
        else if (data.estado === "error"){
          console.log("error al traer los datos del pedido",data); 
        }
      });
      break;

      case 'pedido_seleccionado':
        let id={
          id_pedido:e.id
        }
        this.service.Mostrar_Informacion_Pedido(id).subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_pedidos={
              event: 'pedido_seleccionado',
              pedido:data.pedido
            }
          }
          else if(data.estado === 'error'){
            this.notifier.notify("error","Ha ocurrido un error al intentar traer los datos del pedido, por favor intente nuevamente ");
          }
        }) 
      break;

      case 'confirmar_pedido':
        this.service.Confirmar_Pedido(e.pedido).subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_pedidos={
              event:'confirmar_pedidos_activos'
            }
          }else{  
            this.notifier.notify("error","error al confirmar un pedido");
          }
        }) 
      break;

      case 'finalizar_pedido':
        this.service.Finalizar_Pedido(e.pedido).subscribe((data:any)=>{
          if(data.estado === 'success'){
            this.config_pedidos={
              event:'finalizar_pedidos_cursos'
            }
          }else{  
            this.notifier.notify("error","error al finalizar un pedido");
          }
        }) 
      break;
    }
  }
}
