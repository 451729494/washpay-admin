/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {EmployeeService} from "../../../../services/corp/employee.service";


@Component({
  selector: 'la-employee-view',
  templateUrl: './employeeView.html'
})
export class EmployeeView implements OnInit{

  public curId = '';

  public employee:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private employeeService:EmployeeService) {

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

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.employeeService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.employee = res.data;
          }else {

          }
        });
    }
  }




}

