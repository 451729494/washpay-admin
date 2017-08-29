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
import {AccountItemService} from "../../../../services/finance/accountItem.service";
import {AccountConstService} from "../../../../services/finance/accountConst.service";



@Component({
  selector: 'la-account-item-edit',
  templateUrl: './accountItemEdit.html'
})
export class AccountItemEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public parentId:AbstractControl;
  public code:AbstractControl;
  public name:AbstractControl;
  public calcType:AbstractControl;
  public description:AbstractControl;

  public calcTypeList=[];
  public accountItemList = [];

  public isError:boolean =false;


  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private authService : AuthService,private accountConstService:AccountConstService,private accountItemService:AccountItemService) {

    this.searchForm = fb.group({
      'parentId': [''],
      'code': ['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'calcType': ['',Validators.compose([Validators.required])],
      'description': ['',]
    });

    this.name = this.searchForm.controls['name'];
    this.parentId = this.searchForm.controls['parentId'];
    this.code = this.searchForm.controls['code'];
    this.calcType = this.searchForm.controls['calcType'];
    this.description = this.searchForm.controls['description'];

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

    if(this.curId){
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.accountItemService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.calcType.setValue(res.data.calcType);
            this.parentId.setValue(res.data.parentId);
            this.description.setValue(res.data.description);


          }
        } else {
          console.log(res.message);
        }
      });
    }

  }

  public ngOnInit():void {

    this.loadData();

    this.accountConstService.findCalcSymbolic()
      .subscribe(res => {
        if (res.successed === '00') {
          this.calcTypeList = res.data;

        } else {
          console.log(res.message);
        }
      });

    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId',this.authService.getCorpId());

    this.accountItemService.findAll(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.accountItemList = res.data;
        } else {
          console.log(res.message);
        }
      });
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lafinance/accountitem']);
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.accountItemService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.parentId.setValue(res.data.parentId);

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
        'parentId': values['parentId'],
        'calcType': values['calcType'],
        'description': values['description'],
        'dispatchedCorpId':this.authService.getCorpId()
      };

      this.accountItemService.save(JSON.stringify(requestParam))
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

