import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  public signup(user_to_login, gethash = null):Observable<any>{
      if(gethash != null){
        user_to_login.gethash = gethash;
      }
      let params= JSON.stringify(user_to_login);

      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'login', params, {headers: headers}).pipe(map(res => res));
  }



  public register(user_to_register):Observable<any>{
      let params= JSON.stringify(user_to_register);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'register', params, {headers: headers}).pipe(map(res => res));

  }
  public update_user(user_to_update):Observable<any>{
      let params= JSON.stringify(user_to_update);
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',this.getToken());
      return this._http.put(this.url+'updateUser/'+user_to_update._id, params, {headers: headers}).pipe(map(res => res));
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
