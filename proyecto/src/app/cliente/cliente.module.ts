import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {InformacionComponent} from './informacion/informacion.component'; 
import { VistaVendidosComponent } from './vista-vendidos/vista-vendidos.component';
import { VistaPlatosComponent } from './vista-platos/vista-platos.component';
import { PedidoComponent } from './pedido/pedido.component';
import { FinalizarComponent } from './finalizar/finalizar.component';
import { PlatosCategoriaComponent } from './platos-categoria/platos-categoria.component';
@NgModule({
  declarations: [
    InformacionComponent,
    VistaVendidosComponent,
    VistaPlatosComponent,
    PedidoComponent,
    FinalizarComponent,
    PlatosCategoriaComponent   
    ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

  ],
  exports:[
    InformacionComponent,
    VistaPlatosComponent,
    VistaVendidosComponent,
    PedidoComponent,
    FinalizarComponent,
    PlatosCategoriaComponent
  ]
})
export class ClienteModule { }
