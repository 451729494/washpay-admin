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
import {MsgTemplateService} from "../../../../services/msg/msgTemplate.service";


@Component({
  selector: 'la-msg-template-edit',
  templateUrl: './msgTemplateEdit.html'
})
export class MsgTemplateEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public description:AbstractControl;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private userService : UserService,private msgTemplateService:MsgTemplateService) {

    this.searchForm = fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(4)])],
      'code': ['',Validators.compose([Validators.required, Validators.minLength(4)])],
      'description': ['',Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.searchForm.controls['name'];
    this.code = this.searchForm.controls['code'];
    this.description = this.searchForm.controls['description'];

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
    this.router.navigate(['/pages/lamsg/msgtemplate']);
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.msgTemplateService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.description.setValue(res.data.description);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.searchForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'description': values['description']
      };

      this.msgTemplateService.save(JSON.stringify(requestParam))
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

