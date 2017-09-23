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
export class BranchService {

  constructor(private http:Http, private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/branch/pageQuery', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public find(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/branch/find', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public save(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/branch/save',  params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/branch/delete','',{'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findAll():Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/findAll', { 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public bindOrdinary(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/bindOrdinary', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }
  public unbindOrdinary(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/unbindOrdinary', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public bindCom(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/bindCom', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public pageQueryByUserId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/branch/pageQueryByUserId', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public pageQueryComByUserId(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/branch/pageQueryComByUserId', {'search': params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findUnBindCommercial(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/findUnBindCommercial', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public bindCommercial(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/bindCommercial', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public unBindCommercial(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/branch/unBindCommercial', { 'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

}
