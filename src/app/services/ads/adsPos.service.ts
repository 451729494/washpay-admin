/**
 * Created by hevan on 2017/2/27.
 */

import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import {AuthService} from "../auth.service";

import { Keys } from "../models/env";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class AdsPosService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/adsPos/pageQuery',{'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/adsPos/find',{'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAll():Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/adsPos/findAll', { 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/adsPos/save',params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/adsPos/delete', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


}
