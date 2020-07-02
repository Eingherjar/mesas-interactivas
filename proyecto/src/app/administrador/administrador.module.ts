import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MesasComponent} from './mesas/mesas.component';
import {PedidosComponent} from './pedidos/pedidos.component';
import {PlatoComponent} from './plato/plato.component';
import {MenuPrincipalComponent} from './menu-principal/menu-principal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    MesasComponent,
    PedidosComponent,
    PlatoComponent,
    MenuPrincipalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  exports:[
   MesasComponent,
   PedidosComponent,
   PlatoComponent,
   MenuPrincipalComponent 
  ]
})
export class AdministradorModule { }
