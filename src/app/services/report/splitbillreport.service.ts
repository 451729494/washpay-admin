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
export class SplitbillreportService {

  constructor(private http:Http, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/commercialOrderStatistics/pageQuery', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public pageQueryByOrdin(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/commercialOrderStatistics/pageQueryByOrdin', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public pageQueryByComm(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/commercialOrderStatistics/pageQueryByComm', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public pageQueryByCommercialId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/commercialOrder/pageQueryByCommercialId', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }



  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/commercialOrderStatistics/find', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/commercialOrderStatistics/save',  params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/commercialOrderStatistics/delete',params, {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

}
