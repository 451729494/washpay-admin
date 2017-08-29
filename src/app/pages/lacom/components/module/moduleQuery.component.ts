/**
 * Created by hevan on 2017/7/3.
 */
/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthorityService} from "../../../../services/check/authority.service";
import {ModuleService} from "../../../../services/check/module.service";

@Component({
  selector: 'la-module-query',
  templateUrl: './moduleQuery.html'
})
export class ModuleQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private moduleService:ModuleService) {


    this.loadData();
  }

  public ngOnInit():void {

  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.moduleService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/lacom/moduleedit'], {queryParams: {paramId: curId}});
  }

  public toSet(curId):any {
    this.router.navigate(['/pages/lacom/moduleview'], {queryParams: {paramId: curId}});
  }

  public toAdd():any {
    this.router.navigate(['/pages/lacom/moduleedit'], {queryParams: {paramId: ''}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.moduleService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  public setPage(curPage){

    console.log(curPage);
    //
    let requestParam = new URLSearchParams();
    requestParam.set('page',curPage.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.moduleService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
         this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
         this.pageNav.totalPages = res.totalPages;
       }
     });
  }

}


