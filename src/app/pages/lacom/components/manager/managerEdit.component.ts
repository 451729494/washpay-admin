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
import {ManagerService} from "../../../../services/corp/manager.service";

@Component({
  selector: 'la-manager-edit',
  templateUrl: './managerEdit.html'
})
export class ManagerEdit implements OnInit{

  public curId = '';
  public msg = '';

  public managerForm:FormGroup;
  public name:AbstractControl;
  public mobile:AbstractControl;
  public password:AbstractControl;
  public email:AbstractControl;


  public isError:boolean =false;

  public branchList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private managerService:ManagerService) {

    this.managerForm = fb.group({
      'name': ['',Validators.compose([Validators.required])],
      'mobile': ['',Validators.compose([Validators.required])],
      'email': ['',Validators.compose([Validators.required])],
      'password': ['',Validators.compose([Validators.required])]
    });

    this.name = this.managerForm.controls['name'];
    this.mobile = this.managerForm.controls['mobile'];
    this.email = this.managerForm.controls['email'];
    this.password = this.managerForm.controls['password'];


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
    this.router.navigate(['/pages/lacom/manager']);
  }


  public loadData(){

    // this.employeeService.findAll()
    //   .subscribe(res =>{
    //     if(res.successed === '00'){
    //       this.branch = res.data;
    //     }else {
    //       this.msg = res.message;
    //     }
    //   });
    console.log(this.curId+"--------------")
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.managerService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.mobile.setValue(res.data.mobile);
            this.email.setValue(res.data.email);
            this.password.setValue(res.data.password);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.managerForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'mobile': values['mobile'],
        'email':values['email'],
        'password':values['password'],
      };

      this.managerService.save(JSON.stringify(requestParam))
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

