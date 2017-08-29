/**
 * Created by hevan on 2017/6/30.
 */


import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import {AuthService} from "../auth.service";

import { Keys } from "../models/env";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class RecruitService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/recruit/pageQuery', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/recruit/find', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/recruit/save',params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/recruit/delete', '', {'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public toHot(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/recruit/toHot','', {'search': params,headers: this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public toApplyApprove(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/recruit/toApplyApprove',  params, { headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public toApprove(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/recruit/toApprove',params, {headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

}
