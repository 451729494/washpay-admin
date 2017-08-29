/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountConstService} from "../../../../services/finance/accountConst.service";

import * as moment from 'moment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../../../services/auth.service";
import {AccountConstItemService} from "../../../../services/finance/accountConstItem.service";

@Component({
  selector: 'account-const-edit',
  templateUrl:'./accountconstEdit.html'
})
export class AccountConstEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';

  public entityId = '';

  public entityName='';

  //
  public accountconstEditForm:FormGroup;
  public name:AbstractControl;
  public code:AbstractControl;
  public value:AbstractControl;
  public calcType='';



  public itemValue='';
  public refStart='';
  public refEnd='';

  public calcTypeList=[];

  public accountConstItemList=[];

  public publishDate;


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private accountConstService:AccountConstService,private accountConstItemService: AccountConstItemService, private authService:AuthService) {

    this.accountconstEditForm = fb.group({

      'name': ['',Validators.compose([Validators.required])],
      'code': ['',Validators.compose([Validators.required])],
      'value': [''],
    });



    this.name = this.accountconstEditForm.controls['name'];
    this.code = this.accountconstEditForm.controls['code'];
    this.value = this.accountconstEditForm.controls['value'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    // this.accountConstService.findAll().subscribe(res =>{
    //   if(res.successed === '00'){
    //     this.categoryList = res.data;
    //   }else {
    //     console.log(res.message);
    //   }
    // });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.accountConstService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            this.name.setValue(res.data.name);
            this.code.setValue(res.data.code);
            this.calcType = res.data.calcType;
            this.value.setValue(res.data.value);

             this.toLoadItem(this.curId);
          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {

    this.accountConstService.findCalcSymbolic()
      .subscribe(res => {
        if (res.successed === '00') {
          this.calcTypeList = res.data;

        } else {
          console.log(res.message);
        }
      });

  }

  calcTypeChange(){

    this.toAdd(this.accountconstEditForm.value);
  }

  public toAdd(values:Object){

    if(this.accountconstEditForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'code': values['code'],
        'value': values['value'],
        'calcType':this.calcType,
        'dispatchedCorpId':this.authService.getCorpId()
      };

      this.accountConstService.save(JSON.stringify(body)).subscribe(res=> {

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

  public toAddItem(){

    let body = {
      'accountConstId': this.curId,
      'value': this.itemValue,
      'refStart':this.refStart,
      'refEnd':this.refEnd
    };

    this.accountConstItemService.save(JSON.stringify(body)).subscribe(res=> {

      if(res.successed === '00'){
        this.toLoadItem(this.curId);
      }else {
        console.log(res.message);
      }
    });

  }

  public toDeleteItem(curItemId){

    let params = new URLSearchParams();
    params.set('id', curItemId + '');

    this.accountConstItemService.delete(params).subscribe(res=> {

      if(res.successed === '00'){

        this.toLoadItem(this.curId);

      }else {
        console.log(res.message);
      }
    });
  }

  public toLoadItem(curItemId){

    let params = new URLSearchParams();
    params.set('accountConstId', curItemId + '');

    params.set('page', '1');
    params.set('itemsPerPage', '100');

    this.accountConstItemService.pageQuery(params).subscribe(res=> {

      if(res.successed === '00'){

        this.accountConstItemList = res.data;

      }else {
        console.log(res.message);
      }
    });
  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/accountconst']);

  }

}
