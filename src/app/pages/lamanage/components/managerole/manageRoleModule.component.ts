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
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-corp-manage-role-module',
  templateUrl: './manageRoleModule.html'
})
export class ManageRoleModuleEdit implements OnInit{

  public curId = '';
  public msg = '';

  public manageRole:any;

  public listModule = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private moduleService : ModuleService,private corpManageModuleService: CorpManageModuleService,private corpManageRoleService:CorpManageRoleService, private authService:AuthService) {


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
    this.router.navigate(['/pages/lamanage/managerole']);
  }

  public toSave():any {


    //find all select
    var data = [];

    for(let m =0 ;m < this.listModule.length;m++){
      let item = this.listModule[m];
      if(item.selChecked === true){
        data.push(item.id);
      }

    }

    let params = {
      ids:data,
      entityId:this.curId
    }

    this.corpManageModuleService.save(params).subscribe(res=>{
      if(res.successed === '00') {

        this.toBack();

      }else{
        this.msg = res.message;
      }

    });

  }

  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);


      this.corpManageRoleService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.manageRole = res.data;


          }else {
            this.msg = res.message;
          }
        });
    }

    let params = new URLSearchParams();

    params.set('manageRoleId',this.curId);
    params.set('corpId',this.authService.getCorpId());


    this.moduleService.pageQueryManage(params).subscribe( res => {
      if(res.successed === '00'){
        this.listModule = res.data;
      }
    });


  }

  public onSubmit(values:Object){


  }

}

