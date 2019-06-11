import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators'

import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn:'root',
})
export class NoticiasService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  public getNoticias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'getNoticias', {headers: headers}).pipe(map(res => res));
  }

}
