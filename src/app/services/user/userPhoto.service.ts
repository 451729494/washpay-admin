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
export class UserPhotoService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/userPhoto/pageQuery', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/userPhoto/find', {search: params})
      .map(res => res.json());
  }

  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/userPhoto/save',params, {headers: Keys.HEADERS})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/userPhoto/delete', {headers: Keys.HEADERS}, {search: params})
      .map(res => res.json());
  }

}
