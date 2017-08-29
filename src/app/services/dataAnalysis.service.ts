/**
 * Created by hevan on 2017/1/17.
 */

import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Keys } from './models/env';
import { AuthService } from './auth.service';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class DataAnalysisService {

  constructor(private http:Http,private _authService:AuthService) {

  }

  public findUserAnalysis(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/dataAnalysis/findUserAnalysis', {'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findBlogAnalysis(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/dataAnalysis/findBlogAnalysis', {'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

  public findRecruitAnalysis(params:any):Observable<any> {
    return this.http.get(Keys.SERVER_URL + '/secure/dataAnalysis/findRecruitAnalysis', {'search':params, 'headers': this._authService.getHeadersAuth()})
      .map(res => res.json());
  }

}
