import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { class_http } from '../shared/abstract_class.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends class_http {

  constructor(private http:HttpClient ) {
    super();
  }

  Listado_Platos():Observable<Object>{
    return this.http.get(this.API_URL+"Platos/Disponibles",this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que regresa el servicio de listado platos ",data);
        return data;
      })
    )
  }

  // array que recolecta los datos de las categorias
  public datos_de_prueba:Array<any>=[];
  
  Imagenes_Categorias():Observable<Object>{
    this.datos_de_prueba=[];
    return this.http.get(this.API_URL+"Categorias",this.getHeaders()).pipe(
       
      map((data:any)=>{
       
        let id_anterior:number;
        let contador = 0;
        data.plato.forEach((element,index) => {
          let id_actual = element.id_categoria;

          if(id_actual ===  id_anterior){
            contador++;
          }else{
            id_anterior = id_actual
            contador = 1;
          }

          if(contador <5 && (id_actual === id_anterior)){
            this.datos_de_prueba.push({
              id_categoria:id_actual,
              imagen:element.imagen
            })
          }
        });
        return this.datos_de_prueba;
      })
    )
  }

  Categorias_Id(data):Observable<object>{
    return this.http.post(this.API_URL + "Categorias/Id",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que devuelve el servicio de categorias id",data);
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

  Realizar_Pedido(data):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Realizar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el pedido realizado",data);
        return data
      })
    )
  }

  Especificar_Pedido(data):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Especificar",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el pedido realizado",data);
        return data
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

  Valorar_Pedido(data):Observable<Object>{
    return this.http.post(this.API_URL+"Pedidos/Valoracion",data,this.getHeaders()).pipe(
      map(data=>{
        console.log("datos que responde el servicio de valorar un pedido",data);
        return data;
      })
    )
  }


}
