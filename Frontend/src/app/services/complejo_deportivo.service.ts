import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn:'root',
})
export class ComplejoDeportivoService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public register(complejo_to_register):Observable<any>{
    let params= JSON.stringify(complejo_to_register);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'saveComplejo', params, {headers: headers}).pipe(map(res => res));
}

public getComplejos():Observable<any>{
  let headers = new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.url+'getComplejos', '', {headers: headers}).pipe(map(res => res));
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
