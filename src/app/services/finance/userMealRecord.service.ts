/**
 * Created by hevan on 2017/7/22.
 */
import { Injectable } from '@angular/core';

import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { Keys } from "../models/env";
import {AuthService} from "../auth.service";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class UserMealRecordService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/userMealRecord/pageQueryEx',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/userMealRecord/find',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/userMealRecord/save',params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/userMealRecord/delete', '',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


}
