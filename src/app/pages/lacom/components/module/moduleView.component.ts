/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthorityService} from "../../../../services/check/authority.service";
import {ModuleService} from "../../../../services/check/module.service";
import {ModuleOperatService} from "../../../../services/check/moduleOperat.service";


@Component({
  selector: 'la-module-view',
  templateUrl: './moduleView.html'
})
export class ModuleView implements OnInit{

  public curId = '';
  public msg = '';

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public module:any;

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private moduleService:ModuleService,private moduleOperatService:ModuleOperatService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
  }

  public ngOnInit():void {
    this.loadData();

    this.loadDataOperat();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lacom/module']);
  }

  public toAddOperat():any {
    this.router.navigate(['/pages/lacom/operatedit'],{queryParams: {paramId: '', moduleId:this.curId}});
  }

  public toEditOperat(opId):any {
    this.router.navigate(['/pages/lacom/operatedit'],{queryParams: {paramId: opId, moduleId:this.curId}});
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.moduleService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.module = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public loadDataOperat(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('module.id',this.curId);
      requestParam.set('page',this.pageNav.page + '');
      requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
      this.moduleOperatService.pageQuery(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.rows = res.data;
            this.pageNav.totalElements = res.totalElements;
            this.pageNav.totalPages = res.totalPages;
          }else {
            this.msg = res.message;
          }
        });
    }
  }

  setPage(event){

  }

}

