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
export class AuthModuleService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/authModule/save',params, {headers:this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public findMoulesByAuthority(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/authModule/findMoulesByAuthority', {search: params, headers:this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

}
