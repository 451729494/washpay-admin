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
export class CorpManageModuleService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpManageModule/pageQuery',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpManageModule/find',{search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAll():Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpManageModule/findAll',{ headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findModuleByRoleId(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpManageModule/findModuleByRoleId', {search: params, headers:this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/corpManageModule/save',params, {headers:this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/corpManageModule/delete', {search:params, headers:this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


}
