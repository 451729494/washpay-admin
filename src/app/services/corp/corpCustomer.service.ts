/**
 * Created by hevan on 2017/6/30.
 */
import { Injectable } from '@angular/core';

import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { Keys } from "../models/env";
import {AuthService} from "../auth.service";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class CorpCustomerService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/pageQuery',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public pageQueryService(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/pageQueryService',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/find',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAllCustomer(params):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/findAllCustomer',{ search:params,headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAllByDispatchedCorpId(params):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/findAllByDispatchedCorpId',{ search:params,headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  /**
   * 发现服务单位
   * @param params
   * @returns {any}
     */
  public findAllServiceByPatchCorpId(params):Observable<any>{
  return this.http.get(Keys.SERVER_URL+'/secure/corpCustomer/findAllByPatchCorpId',{ search:params,headers:this._authService.getHeadersAuth()})
    .map(res => res.json());
  }

  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/corpCustomer/save',params, {headers:this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/corpCustomer/delete', {search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


}
