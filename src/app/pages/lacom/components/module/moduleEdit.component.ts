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


@Component({
  selector: 'la-module-edit',
  templateUrl: './moduleEdit.html'
})
export class ModuleEdit implements OnInit{

  public curId = '';
  public msg = '';

  public moduleForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public parentId:AbstractControl;
  public icon:AbstractControl;
  public title:AbstractControl;
  public menuOrder:AbstractControl;


  public isError:boolean =false;

  public moduleList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private moduleService:ModuleService) {

    this.moduleForm = fb.group({
      'name': ['',Validators.compose([Validators.required])],
      'code': ['',Validators.compose([Validators.required])],
      'parentId': ['',],
      'icon': ['',],
      'title': ['',],
      'menuOrder': ['',Validators.compose([Validators.required])]
    });

    this.name = this.moduleForm.controls['name'];
    this.code = this.moduleForm.controls['code'];
    this.menuOrder = this.moduleForm.controls['menuOrder'];
    this.icon = this.moduleForm.controls['icon'];
    this.title = this.moduleForm.controls['title'];
    this.parentId = this.moduleForm.controls['parentId'];


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
    this.router.navigate(['/pages/lacom/module']);
  }


  public loadData(){

    this.moduleService.findAll()
      .subscribe(res =>{
        if(res.successed === '00'){
          this.moduleList = res.data;
        }else {
          this.msg = res.message;
        }
      });

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.moduleService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.icon.setValue(res.data.icon);
            this.title.setValue(res.data.title);
            this.menuOrder.setValue(res.data.menuOrder);

            this.parentId.setValue(res.data.parentId);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.moduleForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'parentId':values['parentId'],
        'menuOrder':values['menuOrder'],
        'icon':values['icon'],
        'title':values['title']
      };

      this.moduleService.save(JSON.stringify(requestParam))
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

