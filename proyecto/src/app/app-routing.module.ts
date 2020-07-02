import { Routes, RouterModule } from '@angular/router';
import {AdministradorComponent} from './administrador/administrador.component';
import {SharedComponent} from './shared/shared.component';
import {ClienteComponent} from './cliente/cliente.component';

// sdefinicion de las rutas de la aplicacion por las cuales entran los usuarios 
const routes: Routes = [
  { path: '', redirectTo: '/login/', pathMatch: 'full' },
  { path: 'admin', component:AdministradorComponent},
  { path: 'login/:id', component:SharedComponent},
  { path: 'cliente/:mesa',component:ClienteComponent}
];
export const APP_ROUTING = RouterModule.forRoot(routes);

