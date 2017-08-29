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

@Component({
  selector: 'la-app-user-query',
  templateUrl: './appUser.html'
})
export class AppUserQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();
  public selId:string;

  public searchForm:FormGroup;
  public username:AbstractControl;
  public selRole:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;

  public roleList=[];

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private userService : UserService,private authorityService:AuthorityService) {

    this.searchForm = fb.group({
      'username': [''],
      'email': [''],
      'mobile': [''],
      'selRole': [''],
    });

    this.email = this.searchForm.controls['email'];
    this.username = this.searchForm.controls['username'];
    this.mobile = this.searchForm.controls['mobile'];
    this.selRole = this.searchForm.controls['selRole'];

    this.loadData();
  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    this.authorityService.findAll()
    .subscribe(res =>{
      if(res.successed === '00'){
        this.roleList = res.data;
      }
    });

  }

  public toView(curId):any {
      this.router.navigate(['/pages/laads/appuserview'], {queryParams: {paramId: curId}});
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/laads/appuseredit'], {queryParams: {paramId: curId}});
  }

  public toAdd():any {
    this.router.navigate(['/pages/laads/appuseredit'], {queryParams: {paramId: ''}});
  }

  public toDelete(curId):any {

  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('username',this.username.value);
    requestParam.set('email',this.email.value);
    requestParam.set('mobile',this.mobile.value);
    requestParam.set('selRole.id',this.selRole.value);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.userService.pageQuery(requestParam)
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

  public onSubmit(values:Object){

    let requestParam = new URLSearchParams();
    requestParam.set('username',values['username']);
    requestParam.set('email',values['email']);
    requestParam.set('mobile',values['mobile']);
    requestParam.set('selRole.id',values['selRole']);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    console.log('sss');

    this.userService.pageQuery(requestParam)
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

  setPage(event){

  }
}

