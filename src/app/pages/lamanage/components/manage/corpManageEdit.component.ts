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
import {AuthService} from "../../../../services/auth.service";
import {CorpManageRoleService} from "../../../../services/corp/corpManageRole.service";
import {CorpManageService} from "../../../../services/corp/corpManage.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";


@Component({
  selector: 'la-corp-manage-edit',
  templateUrl: './corpManageEdit.html'
})
export class CorpManageEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public realName:AbstractControl;
  public password:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;
  public custCorpId:AbstractControl;

  public selRoleId:AbstractControl;


  public isError:boolean =false;

  public dispatchedCorpId = '';

  public listRole=[];

  public listManageRole = [];

  public selUserId = '';

  public listCorpCustomer=[];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private userService : UserService,private authorityService:AuthorityService,private authService : AuthService,private corpManageRoleService : CorpManageRoleService, private corpManageService : CorpManageService, private corpCustomerService:CorpCustomerService) {

    this.searchForm = fb.group({
      'realName': ['',Validators.compose([Validators.required])],
      'email': ['',Validators.compose([Validators.required, EmailValidator.validate])],
      'mobile': ['',Validators.compose([Validators.required])],
      'password': ['',],
      'selRoleId': ['',Validators.compose([Validators.required])],
      'custCorpId': [''],
    });

    this.email = this.searchForm.controls['email'];
    this.realName = this.searchForm.controls['realName'];
    this.mobile = this.searchForm.controls['mobile'];
    this.password = this.searchForm.controls['password'];
    this.selRoleId = this.searchForm.controls['selRoleId'];
    this.custCorpId = this.searchForm.controls['custCorpId'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

    this.dispatchedCorpId = this.authService.getCorpId();


  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    this.authorityService.findAll()
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listRole = res.data;
        }
      });

    let paramMRole = new URLSearchParams();
    paramMRole.set('dispatchedCorpId', this.authService.getCorpId() );
    this.corpManageRoleService.findAll(paramMRole)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.listManageRole = res.data;
        }
      });


    this.loadData();
  }

  public onChange(value):any {
      console.log(value);
  }

  public toBack():any {
    if(this.dispatchedCorpId){
      this.router.navigate(['/pages/lamanage/corpmanage'], {queryParams: {paramId: this.dispatchedCorpId}});
    }
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.corpManageService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
              this.realName.setValue(res.data.user.realName);
              this.mobile.setValue(res.data.user.mobile);
              this.email.setValue(res.data.user.email);
              this.selRoleId.setValue(res.data.authority.id);
              this.selUserId = res.data.user.id;
              this.custCorpId.setValue(res.data.custCorpId);
              //角色判断
              if(res.data.mangeRoles){
                for(let i=0;i<res.data.mangeRoles.length;i++){
                  for(let m=0;m<this.listManageRole.length;m++){
                    if(res.data.mangeRoles[i].id == this.listManageRole[m].id){
                      this.listManageRole[m].selChecked = true;
                    }
                  }
                }
              }


          }else {
            this.msg = res.message;
          }
        });
    }


    //加载对应的客户单位
    let params = new URLSearchParams();
    params.set('dispatchedCorpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllByDispatchedCorpId(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listCorpCustomer = res.data;
      }else {
        console.log(res.message);
      }
    });

  }

  public onSubmit(values:Object){

    if(this.searchForm.valid){

      let selManageRoles = [];

      for(let m=0;m<this.listManageRole.length;m++){
        if(this.listManageRole[m].selChecked === true){
          selManageRoles.push(this.listManageRole[m]);
        }
      }

      let requestParam = {
        'id':this.curId,
        'user':{
          'id':this.selUserId,
          'realName':values['realName'],
          'email':values['email'],
          'mobile':values['mobile'],
          'password':values['password'],
        },
        'mangeRoles':selManageRoles,
        'authority':{id:values['selRoleId']},
        'custCorpId':values['custCorpId'],
        'corpId':this.dispatchedCorpId,
      };
      console.log(JSON.stringify(requestParam));
      this.corpManageService.save(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            this.toBack();
          }else {
            this.msg = res.message;
          }
        });
    }
  }



}

