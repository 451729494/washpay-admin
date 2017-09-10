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
export class SplitbillService {

  constructor(private http:Http, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/splitbill/pageQuery', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/splitbill/find', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/splitbill/save',  params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/splitbill/delete', params,{'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public addManager(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/splitbill/addManager', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public addCommcial(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/splitbill/addComm', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public updateRateById(params:any):Observable<any> {

    console.log(params+"params");

    return this.http.get(Keys.SERVER_URL + '/splitbill/updateRateById'+'?'+params,{'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


}
