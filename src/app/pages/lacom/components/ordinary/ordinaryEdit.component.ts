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
import {OrdinaryService} from "../../../../services/ordinary/ordinary.service";

@Component({
  selector: 'la-ordinary-edit',
  templateUrl: './ordinaryEdit.html'
})
export class OrdinaryEdit implements OnInit{

  public curId = '';
  public msg = '';

  public ordinaryForm:FormGroup;
  public companyName:AbstractControl;
  public registedDate:AbstractControl;
  public connectName:AbstractControl;
  public connectPhone:AbstractControl;
  public city:AbstractControl;
  public address:AbstractControl;
  public remark:AbstractControl;


  public isError:boolean =false;


  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private ordinaryService:OrdinaryService) {

    this.ordinaryForm = fb.group({
      'companyName': ['',Validators.compose([Validators.required])],
      'registedDate': ['',Validators.compose([Validators.required])],
      'connectName': ['',Validators.compose([Validators.required])],
      'connectPhone': ['',Validators.compose([Validators.required])],
      'city': ['',Validators.compose([Validators.required])],
      'remark': ['',Validators.compose([Validators.required])],
      'address': ['',Validators.compose([Validators.required])],
    });

    this.companyName = this.ordinaryForm.controls['companyName'];
    this.registedDate = this.ordinaryForm.controls['registedDate'];
    this.connectName = this.ordinaryForm.controls['connectName'];
    this.connectPhone = this.ordinaryForm.controls['connectPhone'];
    this.city = this.ordinaryForm.controls['city'];
    this.address = this.ordinaryForm.controls['address'];
    this.remark = this.ordinaryForm.controls['remark'];


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
    this.router.navigate(['/pages/lacom/ordinary']);
  }


  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.ordinaryService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.companyName.setValue(res.data.companyName);
            this.registedDate.setValue(res.data.registedDate);
            this.connectName.setValue(res.data.connectName);
            this.connectPhone.setValue(res.data.connectPhone);
            this.city.setValue(res.data.city);
            this.address.setValue(res.data.address);
            this.remark.setValue(res.data.remark);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    console.log("================")
    if(this.ordinaryForm.valid){

      let requestParam = {'id': this.curId,
        'companyName': values['companyName'],
        'registedDate': values['registedDate'],
        'connectName':values['connectName'],
        'connectPhone':values['connectPhone'],
        'city':values['city'],
        'address':values['address'],
        'remark':values['remark'],
      };

      this.ordinaryService.addOrdinaryAdmin(JSON.stringify(requestParam))
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

