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
import {UserEventService} from "../../../../services/check/userEvent.service";

@Component({
  selector: 'la-user-event',
  templateUrl: './userEvent.html'
})
export class UserEvent implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public username:AbstractControl;
  public mobile:AbstractControl;

  public roleList=[];

  loading = false;

  public constructor(fb:FormBuilder,private router: Router,private userEventService : UserEventService,private authorityService:AuthorityService) {

    this.searchForm = fb.group({
      'username': [''],
      'mobile': [''],
    });

    this.username = this.searchForm.controls['username'];
    this.mobile = this.searchForm.controls['mobile'];

    this.loadData();
  }

  public ngOnInit():void {


  }

  public toDelete(curId):any {

  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('username',this.username.value);
    requestParam.set('mobile',this.mobile.value);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.userEventService.pageQuery(requestParam)
    .subscribe(res =>{
      if(res.successed === '00'){
      this.rows = res.data;
      this.pageNav.totalElements = res.totalElements;
      this.pageNav.totalPages = res.totalPages;
      }else {
        if(res.error === 'invalid_token'){
          this.router.navigate(['/login']);
        }
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

    this.userEventService.pageQuery(requestParam)
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

