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
import {CorpManageRoleService} from "../../../../services/corp/corpManageRole.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'la-corp-manage-role-query',
  templateUrl: './manageRole.html'
})
export class ManageRoleQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private authService : AuthService,private corpManageRoleService:CorpManageRoleService) {


    this.loadData();
  }

  public ngOnInit():void {

  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();

    requestParam.set('id',curId);
    this.corpManageRoleService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/lamanage/manageroleedit'], {queryParams: {paramId: curId}});
  }

  public toAdd():any {
    this.router.navigate(['/pages/lamanage/manageroleedit'], {queryParams: {paramId: ''}});
  }

  public toSet(curId):any {
    this.router.navigate(['/pages/lamanage/managerolemodule'], {queryParams: {paramId: curId}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set("corpId", this.authService.getCorpId());
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.corpManageRoleService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  setPage(event){
    let requestParam = new URLSearchParams();
    requestParam.set("corpId", this.authService.getCorpId());
    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.corpManageRoleService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }
}


