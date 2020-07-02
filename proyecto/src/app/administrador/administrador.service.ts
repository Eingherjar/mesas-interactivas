import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {class_http} from '../shared/abstract_class.component'
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService  extends class_http{

  constructor( private http:HttpClient) {
    super();
  }

  // este servicio se encarga de hacer las peticiones a la api-rest de google cloud  
  // crear un plato 
  Crear_Platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"/Platos/Crear",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que retorna el servicio de crear platos");
        return data;
      })
    )
  }

  // modificar un plato por medio del id del plato que se quiere modificar
  Modificar_platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"Platos/Modificar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que trae el servicio de modificar platos",data);
        return data;
      })
    )
  }

  // añadir categorias a los platos
  Agregar_Categorias_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Categorias/Agregar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que mestra el servicio de añadir una categoria al plato",data);
        return data;
      })
    )
  }

  //lista de platos disponibles
  Listado_Platos():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/Disponibles",this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que regresa el servicio de listado platos ",data);
        return data;
      })
    )
  }

  // lista de platos no disponibles
  Listado_no_Dispopnibles():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/NoDisponibles",this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de listrado de platos no disponibles",data);
        return data;
      })
    )
  }


  Listado_Categorias_Platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"Platos/Categorias",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que se estan mostrando en el servicio de listado categorias platos",data);
        return data;
      })
    )
  }

  Mostrar_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Plato/Id",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos del servicio de mostrar plato",data);
        return data;
      })
    )
  }

  Mostrar_Pedidos_Realizados():Observable<Object>{
    return this.http.get(this.API_URL+ "Pedidos/Activos" ,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que muestra el servicio de mostrar pedidos realizados",data);
        return data;
      })
    )
  }

  Mostrar_Pedidos_EnCurso():Observable<Object>{
    return this.http.get(this.API_URL + "Pedidos/EnCurso" ,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que muestra el servicio de mostrar pedidos realizados",data);
        return data;
      })
    )
  }
  
  Mostrar_Pedidos_Finalizados():Observable<Object>{
    return this.http.get(this.API_URL + "Pedidos/Finalizados" ,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que muestra el servicio de mostrar pedidos realizados",data);
        return data;
      })
    )
  }

  Mostrar_Informacion_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Informacion",id,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de mostar informacion de un pedido",data);
        return data;
      })
    )
  }

  Confirmar_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Confirmar",id,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de confirmar pedido",data);
        return data;
      })
    )
  }

  Finalizar_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Finalizar",id,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de confirmar pedido",data);
        return data;
      })
    )
  }

}
