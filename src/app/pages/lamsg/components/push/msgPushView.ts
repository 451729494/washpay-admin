/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit,ChangeDetectionStrategy,ViewChild} from '@angular/core';
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
import {CorpService} from "../../../../services/corp/corp.service";
import {MsgPushService} from "../../../../services/msg/msgPush.service";


@Component({
  selector: 'la-msg-push-view',
  templateUrl: './msgPushView.html'
})
export class MsgPushView implements OnInit{

  public curId = '';

  public msgPush:any;

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private msgPushService:MsgPushService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

  }

  public ngOnInit():void {
    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lamsg/msgpush']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.msgPushService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.msgPush = res.data;
          }else {
          }
        });
    }
  }



}

