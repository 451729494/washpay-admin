/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";


import {EmailValidator, EqualPasswordsValidator} from '../../../../theme/validators';

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {AuthorityService} from "../../../../services/check/authority.service";


@Component({
  selector: 'la-app-user-view',
  templateUrl: './appUserView.html'
})
export class AppUserView implements OnInit{

  public curId = '';
  public msg = '';


  public curUser;

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private userService : UserService,private authorityService:AuthorityService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];


  }

  public ngOnInit():void {

    this.loadData();
  }


  public toBack():any {
      this.router.navigate(['/pages/laads/appuser']);
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('userId',this.curId);

      this.userService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
             this.curUser = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }


}

