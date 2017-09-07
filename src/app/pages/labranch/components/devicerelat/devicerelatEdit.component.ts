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
import { BranchService } from "../../../../services/branch/branch.service";
import {DevicerelatService} from "../../../../services/branch/devicerelat.service";


@Component({
  selector: 'la-devicerelatEdit-edit',
  templateUrl: './devicerelatEdit.html'
})
export class DevicerelatEdit implements OnInit{

  public curId = '';
  public msg = '';

  public deviceForm:FormGroup;
  public branchId:AbstractControl;
  public deviceId:AbstractControl;
  public deviceName:AbstractControl;
  public deviceSn:AbstractControl;
  public deviceMac:AbstractControl;


  public isError:boolean =false;

  public branchList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private devicerelatService:DevicerelatService,private branchService:BranchService) {

    this.deviceForm = fb.group({
      'deviceId': ['',Validators.compose([Validators.required])],
      'deviceName': ['',Validators.compose([Validators.required])],
      'deviceSn': ['',Validators.compose([Validators.required])],
      'deviceMac': ['',Validators.compose([Validators.required])],
      'branchId': ['',Validators.compose([Validators.required])]
    });

    this.deviceId = this.deviceForm.controls['deviceId'];
    this.deviceName = this.deviceForm.controls['deviceName'];
    this.deviceSn = this.deviceForm.controls['deviceSn'];
    this.deviceMac = this.deviceForm.controls['deviceMac'];
    this.branchId = this.deviceForm.controls['branchId'];


    //直接获取参数
    // this.curId = this.acRoute.snapshot.queryParams["paramId"];

    this.branchService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.branchList = res.data;
      }else {
        console.log(res.message);
      }
    });


  }

  public ngOnInit():void {

    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/labranch/devicerelat']);
  }


  public loadData(){

    console.log(this.curId+"--------------")
    // if(this.curId){
    //   let requestParam = new URLSearchParams();
    //   requestParam.set('id',this.curId);
    //
    //   this.devicerelatService.find(requestParam)
    //     .subscribe(res =>{
    //       if(res.successed === '00'){
    //         this.employName.setValue(res.data.employName);
    //         this.mobile.setValue(res.data.mobile);
    //         this.email.setValue(res.data.email);
    //         this.password.setValue(res.data.password);
    //         this.branchId.setValue(res.data.branchId);
    //
    //       }else {
    //         this.msg = res.message;
    //       }
    //     });
    // }
  }

  public onSubmit(values:Object){

    if(this.deviceForm.valid){

      let requestParam = {'id': this.curId,
        'deviceId': values['deviceId'],
        'deviceName': values['deviceName'],
        'deviceSn':values['deviceSn'],
        'deviceMac':values['deviceMac'],
        'branchId':values['branchId']
      };

      this.devicerelatService.add(JSON.stringify(requestParam))
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

