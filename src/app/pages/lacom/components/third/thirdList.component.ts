/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {SysThirdService} from "../../../../services/third/third.service";

@Component({
  selector: 'la-sys-third-List',
  templateUrl: './thirdList.html'
})
export class SysThirdListComponent implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  loading = false;

  @Input()
  public dispatchedCorpId = '';


  public constructor(fb:FormBuilder,private router: Router,private sysThirdService:SysThirdService) {

  }

  public ngOnInit():void {
    this.loadData();
  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.sysThirdService.delete(requestParam)
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
    requestParam.set('dispatchedCorpId',this.dispatchedCorpId);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.sysThirdService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  public initData(dispatchedCorpId){
    this.dispatchedCorpId = dispatchedCorpId;
    this.loadData();
  }

  setPage(event){

  }
}


