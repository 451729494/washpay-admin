/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {AuthService} from "../../../../services/auth.service";
import {AccountItemService} from "../../../../services/finance/accountItem.service";

@Component({
  selector: 'la-accountposition-edit',
  templateUrl:'./accountpositionEdit.html'
})
export class AccountPositionEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';

  public entityId = '';

  public entityName='';

  //
  public accountpositionEditForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public accountItemId:AbstractControl;//一级科目
  public salaryHour:AbstractControl;//时薪
  public salaryBasic:AbstractControl;//底薪
  public description:AbstractControl;//备注
  public status:AbstractControl;//状态


  public accountItemList= [];

  public publishDate;


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private accountItemService:AccountItemService,private accountPositionService:AccountPositionService, private authService:AuthService) {

    this.accountpositionEditForm = fb.group({

      'name': ['',Validators.compose([Validators.required])],
      'code': ['',Validators.compose([Validators.required])],
      'accountItemId': ['',Validators.compose([Validators.required])],
      'salaryHour': ['',Validators.compose([Validators.required])],
      'salaryBasic': ['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'description': ['',],

    });


    this.name = this.accountpositionEditForm.controls['name'];
    this.code = this.accountpositionEditForm.controls['code'];
    this.accountItemId = this.accountpositionEditForm.controls['accountItemId'];
    this.salaryHour = this.accountpositionEditForm.controls['salaryHour'];
    this.salaryBasic = this.accountpositionEditForm.controls['salaryBasic'];
    this.status = this.accountpositionEditForm.controls['status'];
    this.description = this.accountpositionEditForm.controls['description'];




    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.accountPositionService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.code.setValue(res.data.code);
            this.name.setValue(res.data.name);
            this.accountItemId.setValue(res.data.accountItem.id);
            this.salaryHour.setValue(res.data.salaryHour);
            this.salaryBasic.setValue(res.data.salaryBasic);
            this.status.setValue(res.data.status);
            this.description.setValue(res.data.description);
          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId',this.authService.getCorpId());
    requestParam.set('level','1');

    this.accountItemService.findAll(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.accountItemList = res.data;
        } else {
          console.log(res.message);
        }
      });

  }

  public toAdd(values:Object){

    if(this.accountpositionEditForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'accountItem': { id:values['accountItemId']},
        'salaryHour': values['salaryHour'],
        'salaryBasic': values['salaryBasic'],
        'status': values['status'],
        'description': values['description'],
        'dispatchedCorpId': this.authService.getCorpId()
      };

      this.accountPositionService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){
          if(!this.curId){
            this.curId = res.data;
            this.toBack();
          }
        }else {
          console.log(res.message);
        }
      });
    }

  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/accountposition']);

  }

}
