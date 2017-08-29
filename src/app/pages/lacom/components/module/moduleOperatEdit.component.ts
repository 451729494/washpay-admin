/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {ModuleService} from "../../../../services/check/module.service";
import {ModuleOperatService} from "../../../../services/check/moduleOperat.service";

@Component({
  selector: 'la-module-operat-edit',
  templateUrl: './moduleOperatEdit.html'
})
export class ModuleOperatEdit implements OnInit{

  public curId = '';
  public msg = '';

  public operatForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public moduleId:AbstractControl;
  public menuOrder:AbstractControl;

  public moduleList = [];

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private moduleService:ModuleService,private moduleOperatService:ModuleOperatService) {

    this.operatForm = fb.group({
      'name': ['',Validators.compose([Validators.required])],
      'code': ['',Validators.compose([Validators.required])],
      'menuOrder': ['',Validators.compose([Validators.required])],
      'moduleId':['']
    });

    this.name = this.operatForm.controls['name'];
    this.code = this.operatForm.controls['code'];
    this.menuOrder = this.operatForm.controls['menuOrder'];
    this.moduleId = this.operatForm.controls['moduleId'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    let curModuleId = this.acRoute.snapshot.queryParams["moduleId"];

    this.moduleService.findAll()
      .subscribe(res =>{
        if(res.successed === '00'){
          this.moduleList = res.data;
          this.moduleId.setValue(curModuleId);
        }else {
          this.msg = res.message;
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
    this.router.navigate(['/pages/lacom/moduleview'], {queryParams: {paramId: this.moduleId.value}});
  }


  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.moduleOperatService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);

            this.menuOrder.setValue(res.data.menuOrder);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.operatForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'moduleId':values['moduleId'],
        'menuOrder':values['menuOrder']
      };

      this.moduleOperatService.save(JSON.stringify(requestParam))
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

