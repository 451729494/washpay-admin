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
import {EmployeeService} from "../../../../services/corp/employee.service";


@Component({
  selector: 'la-employee-edit',
  templateUrl: './employeeEdit.html'
})
export class EmployeeEdit implements OnInit{

  public curId = '';
  public msg = '';

  public employeeForm:FormGroup;
  public employName:AbstractControl;
  public mobile:AbstractControl;
  public branchId:AbstractControl;
  public password:AbstractControl;
  public email:AbstractControl;


  public isError:boolean =false;

  public branchList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private employeeService:EmployeeService) {

    this.employeeForm = fb.group({
      'employName': ['',Validators.compose([Validators.required])],
      'mobile': ['',Validators.compose([Validators.required, Validators.minLength(11),Validators.maxLength(11)])],
      'email': ['',Validators.compose([Validators.required])],
      'password': ['',Validators.compose([Validators.required])],
      'branchId': ['',Validators.compose([Validators.required])]
    });

    this.employName = this.employeeForm.controls['employName'];
    this.mobile = this.employeeForm.controls['mobile'];
    this.email = this.employeeForm.controls['email'];
    this.password = this.employeeForm.controls['password'];
    this.branchId = this.employeeForm.controls['branchId'];


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
    this.router.navigate(['/pages/lacom/employee']);
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

      this.employeeService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.employName.setValue(res.data.employName);
            this.mobile.setValue(res.data.mobile);
            this.email.setValue(res.data.email);
            this.password.setValue(res.data.password);
            this.branchId.setValue(res.data.branchId);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.employeeForm.valid){

      let requestParam = {'id': this.curId,
        'employName': values['employName'],
        'mobile': values['mobile'],
        'email':values['email'],
        'password':values['password'],
        'branchId':values['branchId']
      };

      this.employeeService.addEmployee(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            console.log("to back");
            this.toBack();
          }else {
            this.msg = res.message;
          }
        });
    }
  }

}

