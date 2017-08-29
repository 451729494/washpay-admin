/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthService} from "../../../../services/auth.service";
import {CheckTypeService} from "../../../../services/check/checkType.service";

@Component({
  selector: 'la-check-type-query',
  templateUrl: './checkType.html'
})
export class CheckTypeQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private authService : AuthService,private checkTypeService:CheckTypeService) {


    this.loadData();
  }

  public ngOnInit():void {

  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/lacheck/checktypeedit'], {queryParams: {paramId: curId}});
  }

  public toSet(curId):any {
    this.router.navigate(['/pages/lacheck/checktyperoleedit'], {queryParams: {paramId: curId}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set("dispatchedCorpId", this.authService.getCorpId());
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.checkTypeService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  setPage(event){

  }
}


