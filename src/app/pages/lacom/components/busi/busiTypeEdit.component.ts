/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {CategoryService} from "../../../../services/blog/category.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";


@Component({
  selector: 'la-busitype-edit',
  templateUrl: './busiTypeEdit.html'
})
export class BusiTypeEdit implements OnInit{

  public curId = '';
  public msg = '';

  public categoryForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public parentId:AbstractControl;
  public menuOrder:AbstractControl;

  public isError:boolean =false;

  public categoryList=[];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private busiTypeService:BusiTypeService) {

    this.categoryForm = fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(2)])],
      'code': ['',Validators.compose([Validators.required, Validators.minLength(2)])],
      'parentId': [''],
      'menuOrder': ['',Validators.compose([Validators.required])]
    });

    this.name = this.categoryForm.controls['name'];
    this.code = this.categoryForm.controls['code'];
    this.parentId = this.categoryForm.controls['parentId'];
    this.menuOrder = this.categoryForm.controls['menuOrder'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
  }

  public ngOnInit():void {

    let paramType = new URLSearchParams();
    paramType.set('code', '');
    this.busiTypeService.findAll(paramType)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.categoryList = res.data;
        }else {
          //this.msg = res.message;
        }
      });

    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/larecruit/busitype']);
  }

  public loadData(){
    if(this.curId.length > 0){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.busiTypeService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.parentId.setValue(res.data.parentId);
            this.menuOrder.setValue(res.data.menuOrder);
          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.categoryForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'parentId': values['parentId'],
        'menuOrder': values['menuOrder']
        };

      this.busiTypeService.save(JSON.stringify(requestParam))
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

