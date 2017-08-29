/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {SysThirdService} from "../../../../services/third/third.service";


@Component({
  selector: 'la-sys-third-edit',
  templateUrl: './thirdEdit.html'
})
export class SysThirdEdit implements OnInit {

  public curId = '';
  public msg = '';

  public thirdForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;

  public icon:AbstractControl;
  public appId:AbstractControl;
  public merchId:AbstractControl;
  public hostUrl:AbstractControl;
  public protocal:AbstractControl;
  public secret:AbstractControl;
  public passwordStr:AbstractControl;
  public port:AbstractControl;
  public signType:AbstractControl;
  public publicKey:AbstractControl;
  public privateKey:AbstractControl;
  public callbackUrl:AbstractControl;


  public dispatchCorpId = '';


  public isError:boolean = false;

  public moduleList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder, private acRoute:ActivatedRoute, private router:Router, private sysThirdService:SysThirdService) {

    this.thirdForm = fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'code': ['', Validators.compose([Validators.required])],
      'icon': ['',],
      'appId': ['', Validators.compose([Validators.required])],
      'merchId': ['',],
      'hostUrl': ['',],
      'protocal': ['',],
      'secret': ['',],
      'passwordStr': ['',],
      'port': ['',],
      'signType': ['',],
      'publicKey': ['',],
      'privateKey': ['',],
      'callbackUrl': ['',]
    });

    this.name = this.thirdForm.controls['name'];
    this.code = this.thirdForm.controls['code'];
    this.appId = this.thirdForm.controls['appId'];
    this.icon = this.thirdForm.controls['icon'];
    this.merchId = this.thirdForm.controls['merchId'];
    this.hostUrl = this.thirdForm.controls['hostUrl'];
    this.protocal = this.thirdForm.controls['protocal'];
    this.port = this.thirdForm.controls['port'];
    this.secret = this.thirdForm.controls['secret'];
    this.passwordStr = this.thirdForm.controls['passwordStr'];
    this.signType = this.thirdForm.controls['signType'];
    this.publicKey = this.thirdForm.controls['publicKey'];
    this.privateKey = this.thirdForm.controls['privateKey'];
    this.callbackUrl = this.thirdForm.controls['callbackUrl'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    this.dispatchCorpId = this.acRoute.snapshot.queryParams["dispatchedCorpId"];
  }

  public ngOnInit():void {

    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack() {
    if (this.dispatchCorpId) {
      this.router.navigate(['/pages/lacom/corpmerchview'], {
        queryParams: {
          paramId: this.dispatchCorpId
        }
      });
    } else {
      this.router.navigate(['/pages/lacom/third']);
    }

  }


  public loadData() {


    if (this.curId) {
      let requestParam = new URLSearchParams();
      requestParam.set('id', this.curId);

      this.sysThirdService.find(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.appId.setValue(res.data.appId);
            this.icon.setValue(res.data.icon);
            this.merchId.setValue(res.data.merchId);
            this.hostUrl.setValue(res.data.hostUrl);
            this.protocal.setValue(res.data.protocal);
            this.port.setValue(res.data.port);
            this.secret.setValue(res.data.secret);
            this.passwordStr.setValue(res.data.password);
            this.signType.setValue(res.data.signType);
            this.publicKey.setValue(res.data.publicKey);
            this.privateKey.setValue(res.data.privateKey);
            this.callbackUrl.setValue(res.data.callbackUrl);

            this.dispatchCorpId = res.data.dispatchCorpId;

          } else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object) {

    if (this.thirdForm.valid) {

      let requestParam = {
        'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'icon': values['icon'],
        'appId': values['appId'],
        'merchId': values['merchId'],
        'hostUrl': values['hostUrl'],
        'protocal': values['protocal'],
        'secret': values['secret'],
        'password': values['passwordStr'],
        'signType': values['signType'],
        'publicKey': values['publicKey'],
        'privateKey': values['privateKey'],
        'callbackUrl': values['callbackUrl'],
        'dispatchCorpId': this.dispatchCorpId
      };

      this.sysThirdService.save(JSON.stringify(requestParam))
        .subscribe(res => {
          if (res.successed === '00') {
            this.toBack();
          } else {
            this.msg = res.message;
          }
        });
    }
  }

}

