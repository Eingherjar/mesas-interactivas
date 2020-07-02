import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import {HttpClient} from '@angular/common/http';
import {class_http} from './abstract_class.component'
@Injectable({
  providedIn: 'root'
})
export class SharedService extends class_http {

  constructor( private http:HttpClient) {
    super();
  }
  headers: string='application/json'

  // metodos del componente login 
  login(data):Observable<Object>{
    return this.http.post(this.API_URL+'Usuario/Login',data, this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que trae la peticion del login",data);
        return data
      })
    )
  }

  // validacion de que el usuario se encuentra creado
  validar_usuario(data):Observable<Object>{
    return this.http.post(this.API_URL+"Usuario/Verificar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos del servicio de validar_usuario",data);
        return data
      })
    )
  }


  // cambiar contraseña
  cambiar_password(data):Observable<Object>{
    return this.http.post(this.API_URL+"Usuario/Cambiar",data,this.getHeaders()).pipe(
      map(data =>{
        console.log("datos que responde el servicio de cambiar password",data);
        return data
      })
    )
  }

  registrar(data):Observable<Object>{
    return this.http.post(this.API_URL+"Usuario/Crear",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que trae el servidio de registrar",data);
        return data;
      })
    )
  }

  // final de los metodos de login 
}

