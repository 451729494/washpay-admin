/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {AuthService} from "../../../../services/auth.service";
import {CheckTypeService} from "../../../../services/check/checkType.service";



@Component({
  selector: 'la-check-type-edit',
  templateUrl: './checkTypeEdit.html'
})
export class CheckTypeEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public codePre:AbstractControl;
  public name:AbstractControl;


  public checkType:any;

  public isError:boolean =false;

  public roleList=[];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private authService : AuthService,private checkTypeService:CheckTypeService) {

    this.searchForm = fb.group({
      'codePre': ['',Validators.compose([Validators.required, Validators.minLength(4)])],
      'name': ['',Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.searchForm.controls['name'];
    this.codePre = this.searchForm.controls['codePre'];

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
    this.router.navigate(['/pages/lacheck/checktype']);
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.checkTypeService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.checkType = res.data;

            this.name.setValue(res.data.name);
            this.codePre.setValue(res.data.codePre);

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
        'codePre': values['codePre']};

      this.checkTypeService.save(JSON.stringify(requestParam))
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

