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
export class CorpSalaryInvoiceService {

  constructor(private http:Http,private _authService:AuthService) {
  }

  public pageQuery(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpSalaryInvoice/pageQuery',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }


  public find(params:any):Observable<any>{
    return this.http.get(Keys.SERVER_URL+'/secure/corpSalaryInvoice/find',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public save(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL+'/secure/corpSalaryInvoice/save',params, {'headers': this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public delete(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/delete', '',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public toCalcSalary(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/calcSalary', '',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public toCalcWorkTime(params:any):Observable<any>{
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/calcWorkTime', '',{'search': params,'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public toApplyApprove(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/toApplyApprove',  params, { headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

  public toApprove(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/toApprove',params, {headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }


  public toPay(params:any):Observable<any> {
    return this.http.post(Keys.SERVER_URL + '/secure/corpSalaryInvoice/toPay','', {'search': params,headers: this._authService.getHeadersAuthJSON()})
      .map(res => res.json());
  }

}
