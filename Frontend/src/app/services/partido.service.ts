import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn:'root',
})
export class PartidoService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public create(partido_to_create):Observable<any>{
    let params= JSON.stringify(partido_to_create);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'partidos/savePartido', params, {headers: headers}).pipe(map(res => res));
  }

  public getPartidosByFecha(fechaInicio, fechaFin,campoid):Observable<any>{
    let params= JSON.stringify({fechaInicio: fechaInicio, fechaFin: fechaFin,campoid:campoid});
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'partidos/getPartidosByFecha', params, {headers: headers}).pipe(map(res => res));
  }

  public getPartidosByJugadorParticipante(user_id):Observable<any>{
    let params= JSON.stringify({id:user_id});
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'partidos/getPartidosByJugadorParticipante', params, {headers: headers}).pipe(map(res => res));
  }

  public getPartidosByJugadorCreador(user_id):Observable<any>{
    let params= JSON.stringify({id:user_id});
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'partidos/getPartidosByJugadorCreador', params, {headers: headers}).pipe(map(res => res));
  }

  public updatePartido(partido_to_update):Observable<any>{
    let params= JSON.stringify(partido_to_update);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.put(this.url+'partidos/updatePartido/'+partido_to_update._id, params, {headers: headers}).pipe(map(res => res));
}


  public getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  public getToken(){
    let token = localStorage.getItem('token');
    if(token!= "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }


}
