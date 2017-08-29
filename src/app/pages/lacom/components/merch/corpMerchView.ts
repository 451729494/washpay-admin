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
import {CorpManageListComponent} from "../user/corpManageList.component";
import {SysThirdListComponent} from "../third/thirdList.component";


@Component({
  selector: 'la-corp-merch-view',
  templateUrl: './corpMerchView.html'
})
export class CorpMerchView implements OnInit{

  public curId = '';
  public msg = '';

  public corp:any;

  @ViewChild(CorpManageListComponent) viewManageChild: CorpManageListComponent ;

  @ViewChild(SysThirdListComponent) viewThirdChild: SysThirdListComponent ;

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private corpService:CorpService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

    //this.viewManageChild.initData(this.curId);
    //this.viewThirdChild.initData(this.curId);
  }

  public ngOnInit():void {
    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lacom/corpmerch']);
  }


  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.corpService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.corp = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }



}

