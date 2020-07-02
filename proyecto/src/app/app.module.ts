import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { ClienteComponent } from './cliente/cliente.component';
import {SharedComponent} from './shared/shared.component';
import { AdministradorComponent } from './administrador/administrador.component';
import {AdministradorModule} from  './administrador/administrador.module'

//  esta constante tiene toda la configuracion de la libreria angular-notifier
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 20,
			gap: 14
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    SharedComponent,
    AdministradorComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    SharedModule,
    ClienteModule,
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientModule,
    FormsModule,
    AdministradorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
