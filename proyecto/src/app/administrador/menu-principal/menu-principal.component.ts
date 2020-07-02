import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  // variable encargada de hacer la condicion para mostrar diferentes vistas
  seleccion: String = "menu";

  // variable que se encarga de mandar datos al padre que en este caso seria administrador
  @Output()send_menu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  // metodo que se encarga de recoger que parte del menu se ha seleccionado y que vista se debe de ver ahora
  envio(condicion) {
    switch (condicion) {

      case 'menu':
        // condicion del menu a ver
        this.seleccion = condicion;
        
        // datos que manda menu al componente de administrador para que se encargue de mostrar el componente que 
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'mesas':
        // condicion del menu a ver
        this.seleccion = condicion;
          // datos que manda menu al componente de administrador para que se encargue de mostrar el componente que 
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'pedidos':
        // condicion del menu a ver
        this.seleccion = condicion;
          // datos que manda menu al componente de administrador para que se encargue de mostrar el componente que 
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;

      case 'cerrar':
        // se quita en el local storage el id del usuario que entro para que pueda ingresar otra persona
        localStorage.setItem("id_usuario", "null");
          // datos que manda menu al componente de administrador para que se encargue de mostrar el componente que 
        this.send_menu.emit({
          event: condicion,
          display: condicion
        })
      break;
    }
  }

}
