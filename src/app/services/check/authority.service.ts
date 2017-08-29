
import { Injectable } from '@angular/core';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { Keys } from "../models/env";

import {AuthService} from "../auth.service";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/Rx";


@Injectable()
export class AuthorityService {

  constructor(private http:Http, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{

    return this.http.get(Keys.SERVER_URL+'/secure/authority/pageQuery',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/authority/find',{search:params,headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAll():Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/authority/findAll',{headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/authority/save',params, {headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/authority/delete','', {search: params, headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }


  private handleError(error:Response) {
    console.error(error);
    alert('服务器已断开');
    return Observable.throw(error.json().message || 'Server error');
  }

}

