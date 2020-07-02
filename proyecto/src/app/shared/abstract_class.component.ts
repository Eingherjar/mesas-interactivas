import { HttpHeaders } from '@angular/common/http';

export class class_http {
  // este contador se va a utilizar ya que cuando aparece el alert, este aparece mas de una sola vez;
  public API_URL = 'https://rest-api-qdxcx3pcaa-uc.a.run.app/';
  public getHeaders(){
    let headers =  new HttpHeaders({
      "Content-Type": "application/json"
      });

    return {headers}
  }
 
}