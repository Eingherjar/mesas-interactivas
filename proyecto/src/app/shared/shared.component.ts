import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  config_login: any;

  private notifier: NotifierService;
  constructor(private servicio: SharedService ,  notifier: NotifierService) { this.notifier = notifier }

  ngOnInit(): void {
  }


  login_events(e) {
    switch (e.event) {
      case 'login':
        this.servicio.login(e.data).subscribe((data: any) => {
          if(data.estado === 'success'){
            this.config_login={
              event:"login",
              id_usuario: data.usuario.id_usuario,
              rol:data.usuario.rol
            }
            
            this.notifier.notify("success", data.mensaje);

          }else if (data.estado === 'error'){
            this.notifier.notify("error", "ha ocurrido un error");
          }

        })
      break;

      case 'validar_usuario':
        this.servicio.validar_usuario(e.data).subscribe((data:any)=>{

          if(data.estado === 'success'){

            this.config_login={
              event:"validar_usuario",
              id_usuario:data.usuario.id_usuario,
              estado:data.estado
            }

            this.notifier.notify("success", data.mensaje);

            
          }else if (data.estado === 'error'){
            this.notifier.notify("error", "ha ocurrido un error");

          }
        })

      break;

      case 'cambiar_password':
        this.servicio.cambiar_password(e.data).subscribe((data:any)=>{
          if(data.estado === 'success'){

            this.notifier.notify("success",data.mensaje);

            this.config_login={
              event:"cambiar_password"
            }

          } else if (data.estado === 'error'){

          }
        }) 
      break;

      case 'registrar':
        
      this.servicio.registrar(e.data).subscribe((data:any)=>{
        if(data.estado === 'error' && data.error.id_alerta == 2){
          this.config_login={
            event:'registrar',
            data:data
          }

          this.notifier.notify("success",data.error.mensaje);
        }else if (data.estado === 'error' && data.error.id_alerta !=2){
          this.notifier.notify("error","error al crear el usuario");
        }
      })
      break;

      case 'mensaje':
        this.notifier.notify(e.tipo,e.mensaje);
    }
  }
}
