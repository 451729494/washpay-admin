/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";

@Component({
  selector: 'la-account-borrow-edit',
  templateUrl:'./borrowinvoiceEdit.html'
})
export class UserAccountBorrowEdit {

  public rows:Array<any> [];

  public curId:string = '';


  //
  public editForm:FormGroup;
  public invoiceType:AbstractControl;//类型
  public invoiceCode:AbstractControl;//代码
  public mobile:AbstractControl;//手机号码
  public realName:AbstractControl;//用户名
  public amount:AbstractControl;//金额
  public description:AbstractControl;//备注
  public status:AbstractControl;//状态

  public curUserId='';

  public listCorpCustomer:Array<any>;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userAccountBorrowService:UserAccountBorrowService, private authService:AuthService) {

    this.editForm = fb.group({
      'invoiceType': ['',Validators.compose([Validators.required])],
      'invoiceCode': ['',Validators.compose([Validators.required])],
      'mobile': ['',],
      'realName': ['',],
      'amount': ['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'description': ['',],
    });

    this.invoiceType = this.editForm.controls['invoiceType'];
    this.invoiceCode = this.editForm.controls['invoiceCode'];
    this.mobile = this.editForm.controls['mobile'];
    this.realName = this.editForm.controls['realName'];
    this.amount = this.editForm.controls['amount'];
    this.description = this.editForm.controls['description'];
    this.status = this.editForm.controls['status'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.userAccountBorrowService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.invoiceType.setValue(res.data.invoiceType);
            this.invoiceCode.setValue(res.data.invoiceCode);
            this.mobile.setValue(res.data.user.mobile);
            this.realName.setValue(res.data.user.realName);
            this.amount.setValue(res.data.amount);
            this.status.setValue(res.data.status);
            this.description.setValue(res.data.description);

            this.curUserId = res.data.user.id;

          }
        } else {
          console.log(res.message);
        }
      });

    }

  }

  public toAdd(values:Object){

    if(this.editForm.valid){

      let body = {
        'id': this.curId,
        'user':{id:this.curUserId},
        'invoiceType': values['invoiceType'],
        'amount': values['amount'],
        'status': values['status'],
        'description': values['description'],
        'dispatchedCorpId': this.authService.getCorpId()
      };

      this.userAccountBorrowService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/lafinance/useraccountborrow']);

  }

}
