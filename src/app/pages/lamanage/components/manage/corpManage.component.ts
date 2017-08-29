/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthorityService} from "../../../../services/check/authority.service";
import {CorpManageService} from "../../../../services/corp/corpManage.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'la-corp-manage',
  templateUrl: './corpManage.html'
})
export class CorpManageQuery implements OnInit{

  public rows:Array<any> = [];
  public pageNav = new PageDataModel();

  private dispatchedCorpId;

  public constructor(fb:FormBuilder,private router: Router,private userService : UserService,private corpManageService:CorpManageService,private authService:AuthService) {

    this.dispatchedCorpId = this.authService.getCorpId();
  }

  public ngOnInit():void {
    this.loadData();
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/lamanage/corpmanageedit'], {queryParams: {'paramId': curId,'dispatchedCorpId': this.dispatchedCorpId}});
  }

  public toAdd():any {
    this.router.navigate(['/pages/lamanage/corpmanageedit'], {queryParams: {paramId: '','dispatchedCorpId':this.dispatchedCorpId}});
  }


  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('corpId',this.dispatchedCorpId);

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.corpManageService.pageQuery(requestParam)
    .subscribe(res =>{
      if(res.successed === '00'){
      this.rows = res.data;
      this.pageNav.totalElements = res.totalElements;
      this.pageNav.totalPages = res.totalPages;
      }else {
        console.log(res.message);
      }
    });
  }

  public toSet(curId){
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);

    this.corpManageService.updateStatus(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
         this.loadData();
        }else {
          console.log(res.message);
        }
      });
  }

  setPage(event){

  }
}

