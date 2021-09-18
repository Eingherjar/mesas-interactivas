import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-vista-vendidos',
  templateUrl: './vista-vendidos.component.html',
  styleUrls: ['./vista-vendidos.component.scss']
})
export class VistaVendidosComponent implements OnInit {

  @Output() send_vista_vendidos = new EventEmitter();
  @Input() config: any;


  // esto se debe de quitrar o añadir mas si se aconfigura algo distinto en la tabla de categorias de la base de datos
  data_bebidas: Array<any> = [];
  data_almuerzos: Array<any> = [];
  data_arroces: Array<any> = [];
  data_carnes: Array<any> = [];
  data_asados: Array<any> = [];
  data_pollos: Array<any> = [];
  data_sopas: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.data_bebidas = [];
    this.data_almuerzos = [];
    this.data_arroces = [];
    this.data_carnes = [];
    this.data_asados = [];
    this.data_pollos = [];
    this.data_sopas = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('config') && this.config) {

      switch (this.config.event) {
        case 'imagen_categorias':
          this.config.categorias.forEach(element => {
            if (element.id_categoria === 1) {
              this.data_bebidas.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 2) {
              this.data_almuerzos.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 3) {
              this.data_arroces.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 4) {
              this.data_carnes.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 5) {
              this.data_asados.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 6) {
              this.data_pollos.push({ imagen: element.imagen })
            }
            else if (element.id_categoria === 7) {
              this.data_sopas.push({ imagen: element.imagen })
            }
          });

          break;
      }
    }
  }

  //  se enecarga de regresar al menu principal
  regresar_menu() {
    this.send_vista_vendidos.emit({
      event: 'regresar_menu'
    })
  }

  //  se encarga de enviar los datos al componente cliente necesarios para que el se peuda traer todos los datos de los platos que contienen la misma categoria seleccionada
  seleccion(condicion) {
    switch (condicion) {

      case 'bebidas':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 1,
          nombre:"Bebidas"
        })
        break;

      case 'almuerzos':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 2,
          nombre:"Almuerzos"
      })

        break;

      case 'arroces':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 3,
          nombre:"Arroces"
      })

        break;

      case 'carnes':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 4,
          nombre:"Carnes"
      })
        break;

      case 'asados':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 5,
          nombre:"Asados"
      })

        break;

      case 'pollos':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 6,
          nombre:"Pollos"
      })

        break;

      case 'sopas':
        this.send_vista_vendidos.emit({
          event: 'seleccion',
          seleccion: 7,
          nombre:"Sopas"
      })
      
        break;
    }
  }
  
}
