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
import {AuthorityService} from "../../../../services/check/authority.service";
import {ModuleService} from "../../../../services/check/module.service";
import {AuthModuleService} from "../../../../services/check/authModule.service";
import {CorpManageRoleService} from "../../../../services/corp/corpManageRole.service";
import {CorpManageModuleService} from "../../../../services/corp/corpManageModule.service";
import {CheckTypeService} from "../../../../services/check/checkType.service";
import {CheckTypeFlowService} from "../../../../services/check/checkTypeFlow.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-check-type-role',
  templateUrl: './checkTypeRole.html'
})
export class CheckTypeRoleEdit implements OnInit{

  public curId = '';
  public msg = '';

  public checkType:any;

  public manageRoleList = [];

  public curManageRole = '';

  public manageRoleFlowList = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private manageRoleService : CorpManageRoleService,private checkTypeService: CheckTypeService, private authService: AuthService, private checkTypeFlowService:CheckTypeFlowService) {

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
    this.router.navigate(['/pages/lacheck/checktype']);
  }

  public toAddRole():any {


    if(this.curManageRole){
      //find all select
      let roleFlow = {
        'checkTypeId':this.curId,
        'manageRole':{id:this.curManageRole},
        'menuOrder':this.manageRoleFlowList.length + 1
      };

      this.checkTypeFlowService.save(JSON.stringify(roleFlow)).subscribe(res=>{
        if(res.successed === '00') {

          this.loadDataFlow();

        }else{
          this.msg = res.message;
        }

      });
    }else{
      alert('请设置业务角色');
    }


  }

  public toDelRole(roleFlowId):any {


    //find all select

    let requestParam = new URLSearchParams();
    requestParam.set('id',roleFlowId);


    console.log('---' +roleFlowId);

    this.checkTypeFlowService.delete(requestParam).subscribe(res=>{
      if(res.successed === '00') {

        this.loadDataFlow();

      }else{
        this.msg = res.message;
      }

    });

  }

  public loadData(){

    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId',this.authService.getCorpId());

    this.manageRoleService.findAll(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){

          this.manageRoleList = res.data;


        }else {
          this.msg = res.message;
        }
      });

    if(this.curId){
      let params = new URLSearchParams();

      params.set('id',this.curId);


      this.checkTypeService.find(params).subscribe( res => {
        if(res.successed === '00'){
          this.checkType = res.data;
        }
      });


      let requestFlow = new URLSearchParams();
      requestFlow.set('checkTypeId',this.curId);

      this.checkTypeFlowService.findAll(requestFlow)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.manageRoleFlowList = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public loadDataFlow(){
    if(this.curId){

      let requestFlow = new URLSearchParams();
      requestFlow.set('checkTypeId',this.curId);

      this.checkTypeFlowService.findAll(requestFlow)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.manageRoleFlowList = res.data;
          }else {
            this.msg = res.message;
          }
        });
    }
  }


  public onSubmit(values:Object){


  }

}

