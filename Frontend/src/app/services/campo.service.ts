import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn:'root',
})
export class CampoService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public create(campo_to_create):Observable<any>{
    let params= JSON.stringify(campo_to_create);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'campos/saveCampo', params, {headers: headers}).pipe(map(res => res));
  }

  public update(campo_to_update):Observable<any>{
    let params= JSON.stringify(campo_to_update);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.put(this.url+'campos/updateCampo/'+campo_to_update._id, params, {headers: headers}).pipe(map(res => res));
  }

  public getCampo(idCampo):Observable<any>{
    let params= JSON.stringify({id:idCampo});
    let headers = new HttpHeaders().set('Content-Type','application/json');
    headers = headers.append('Authorization',this.getToken());
    return this._http.post(this.url+'campos/saveCampo', params, {headers: headers}).pipe(map(res => res));
  }

  public getCampos(tipo,idcomplejo):Observable<any>{
    let params= JSON.stringify({tipo: tipo, idcomplejo:idcomplejo});
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'campos/getCampos', params, {headers: headers}).pipe(map(res => res));
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
