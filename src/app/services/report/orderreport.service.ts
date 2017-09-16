/**
 * Created by hevan on 2017/6/30.
 */


import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { Keys } from "../models/env";
import 'rxjs/add/operator/map';
import "rxjs/Rx";
import {AuthService} from "../auth.service";

@Injectable()
export class OrderreportService {

  constructor(private http:Http, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/orderReport/pageQuery', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public pageQueryByOrdinary(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/orderReport/pageQueryByOrdinary', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public pageQueryByComm(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/orderReport/pageQueryByComm', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/orderReport/find', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/orderReport/save',  params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/orderReport/delete',params, {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }



}
