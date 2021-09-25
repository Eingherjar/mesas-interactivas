import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {class_http} from '../shared/abstract_class.component'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
        return data;
      })
    )
  }

  // modificar un plato por medio del id del plato que se quiere modificar
  Modificar_platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"Platos/Modificar",data,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  // añadir categorias a los platos
  Agregar_Categorias_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Categorias/Agregar",data,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  //lista de platos disponibles
  Listado_Platos():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/Disponibles",this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  // lista de platos no disponibles
  Listado_no_Dispopnibles():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/NoDisponibles",this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }


  Listado_Categorias_Platos(data):Observable<Object>{
    return this.http.post(this.API_URL+"Platos/Categorias",data,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Mostrar_Plato(data):Observable<Object>{
    return this.http.post(this.API_URL+"Plato/Id",data,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Mostrar_Pedidos_Realizados():Observable<Object>{
    return this.http.get(this.API_URL+ "Pedidos/Activos" ,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Mostrar_Pedidos_EnCurso():Observable<Object>{
    return this.http.get(this.API_URL + "Pedidos/EnCurso" ,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }
  
  Mostrar_Pedidos_Finalizados():Observable<Object>{
    return this.http.get(this.API_URL + "Pedidos/Finalizados" ,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Mostrar_Informacion_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Informacion",id,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Confirmar_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Confirmar",id,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

  Finalizar_Pedido(id):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Finalizar",id,this.getHeaders()).pipe(
      map(data=>{
        return data;
      })
    )
  }

}
