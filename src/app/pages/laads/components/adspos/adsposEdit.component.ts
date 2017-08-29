/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {AdsPosService} from "../../../../services/ads/adsPos.service";


@Component({
  selector: 'la-adspos-edit',
  templateUrl: './adsposEdit.html'
})
export class AdsPosEdit implements OnInit{

  public curId = '';
  public msg = '';

  public adsPosForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;

  public isError:boolean =false;

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private adsPosService:AdsPosService) {

    this.adsPosForm = fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(2)])],
      'code': ['',Validators.compose([Validators.required, Validators.minLength(2)])]
    });

    this.name = this.adsPosForm.controls['name'];
    this.code = this.adsPosForm.controls['code'];

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
    this.router.navigate(['/pages/laads/adspos']);
  }

  public loadData(){
    if(this.curId.length > 0){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.adsPosService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.adsPosForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        };

      this.adsPosService.save(JSON.stringify(requestParam))
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

