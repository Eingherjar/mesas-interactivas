import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() send_login = new EventEmitter();

  @Input() configuracion: any;


  condicion: string = "login_inicio";

  id_usuario: number = -1;

  id_mesa: number = 0;

  // variable que rocoge todo lo que tenga que ver con login 
  data_login: any;

  texto_usuario: String = '';

  texto_password: String = '';

  texto_correo: String = '';

  texto_new_password: String = '';


  // sexo
  masculino: boolean = false;
  femenino: boolean = false;
  otro: boolean = false;

  constructor(private router: Router, private router_url: ActivatedRoute) { }

  ngAfterViewInit() {
    
    localStorage.clear();

    this.id_mesa = parseInt(this.router_url.snapshot.paramMap.get('id'));
    if (this.id_mesa == undefined || this.id_mesa== null || this.id_mesa == 0) {
      this.router.navigate(['/login/']);
    }
  }

  ngOnInit(): void {
    this.id_mesa = parseInt(this.router_url.snapshot.paramMap.get('id'));
    localStorage.setItem("id_mesa",""+this.id_mesa);
    let usuario = localStorage.getItem('id_usuario');

    if (usuario !== null) {
      let id = localStorage.getItem("id_mesa");
      this.router.navigate(['cliente/'+(this.id_mesa != 0 ? this.id_mesa : id)]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('configuracion') && this.configuracion) {
      switch (this.configuracion.event) {

        case 'login':
          this.data_login = this.configuracion;

          if (this.data_login.rol === 2) {

            localStorage.setItem("id_usuario", this.data_login ? this.data_login.id_usuario : 0);
            this.router.navigate(['cliente/' +this.id_mesa]);
            this.send_login.emit({
              event: "mensaje",
              tipo: "success",
              mensaje: "Se ha ingresado como Usuario Registrado"
            })
          } else if (this.data_login.rol === 1) {
            this.router.navigate(['admin']);
            this.send_login.emit({
              event: "mensaje",
              tipo: "success",
              mensaje: "Se ha ingresado como Administrador "
            })
          }

            break;

        case 'validar_usuario':
          localStorage.setItem("id_usuario", this.configuracion.id_usuario);
          this.texto_password = '';
          this.texto_new_password = '';
          this.condicion = 'cambiar_password';
          this.id_usuario = this.id_usuario != this.configuracion.id_usuario ? this.configuracion.id_usuario : this.id_usuario;
          this.router.navigate(['/login/'+ localStorage.getItem("id_mesa")]);

          break;

        case 'cambiar_password':
          this.texto_password = '';
          this.texto_usuario = '';
          this.condicion = 'vista_iniciar';
          break;

        case 'registrar':
          break;
      }
    }
  }


  // metodo de iniciar sesion de usuario registrado
  iniciar(condicion) {

    if (condicion === 'invitado') {
      localStorage.setItem("id_usuario", "3");
      this.router.navigate(['cliente/' + "" + this.id_mesa]);
      this.send_login.emit({
        event: "mensaje",
        tipo: "success",
        mensaje: "Se ha ingresado como Usuario Invitado"
      })
    } else {
      let login = {
        nombre: this.texto_usuario = this.texto_usuario,
        password: this.texto_password = this.texto_password
      }
      this.send_login.emit({
        event: 'login',
        data: login
      })
    }
  }



  validar_usuario() {

    let validar = {
      nombre: this.texto_usuario,
      correo: this.texto_correo
    }

    this.send_login.emit({
      event: "validar_usuario",
      data: validar
    })

  }

  cambiar_password() {

    if (this.texto_password === this.texto_new_password) {
      let cambiar = {
        id_usuario: this.id_usuario,
        password: this.texto_new_password
      }

      this.send_login.emit({
        event: "cambiar_password",
        data: cambiar
      })

    }
    else if (this.texto_password !== this.texto_new_password) {
      this.send_login.emit({
        event: "mensaje",
        tipo: "info",
        mensaje: "no se puede cambiar la contraseña porque las dos no coinciden"
      })
    }


  }

  validar_sexo(condicion) {
    if (condicion === 'masculino') {
      this.femenino = this.masculino == true && this.otro == false ? false : true;
      this.otro = this.masculino == true && this.femenino == false ? false : true;
    }
    else if (condicion === 'femenino') {
      this.masculino = this.femenino == true && this.otro == false ? false : true;
      this.otro = this.femenino == true && this.masculino == false ? false : true;
    }
    else if (condicion === 'otro') {
      this.femenino = this.otro == true && this.masculino == false ? false : true;
      this.masculino = this.otro == true && this.femenino == false ? false : true;
    }
  }

  registrar() {
    
    let registrar = {
      nombre: this.texto_usuario,
      correo: this.texto_correo,
      password: this.texto_password
    }
    // && (this.femenino || this.masculino || this.otro)
    if (this.texto_usuario != '' && this.texto_correo != '' && this.texto_password != '') {
      this.send_login.emit({
        event: "registrar",
        data: registrar
      })
    } else {
      this.send_login.emit({
        event: 'mensaje',
        mensaje: 'Porfavor llene todos los campos para poder registrase',
        tipo: 'info'
      })
    }
  }
}
