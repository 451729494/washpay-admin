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

import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";

@Component({
  selector: 'la-account-borrow-view',
  templateUrl:'./borrowinvoiceView.html'
})
export class UserAccountBorrowView {

  public rows:Array<any> [];

  public curId:string = '';
  backAction ='query';

  public bPay =false;
  //
  public userAccountBorrow:any;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userAccountBorrowService:UserAccountBorrowService, private authService:AuthService) {

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];
    this.backAction = this.route.snapshot.queryParams["backAction"];
  }

  public ngOnInit():void {

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.userAccountBorrowService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.userAccountBorrow = res.data;

          }
        } else {
          console.log(res.message);
        }
      });

    }

  }


  toPay(){

    this.bPay = true;

    let requestParam = new URLSearchParams();
    requestParam.set('id', this.curId);

    this.userAccountBorrowService.toPay(requestParam)
      .subscribe(res => {

        if (res.successed === '00') {

          alert("支付成功");
        } else {
          this.bPay =false;

          alert(res.message);
        }
      });

  }

  public toBack() {

    if(this.backAction === 'query'){
      this.router.navigate(['/pages/lafinance/borrowinvoice']);
    }else if(this.backAction === 'apply'){
      this.router.navigate(['/pages/lafinance/borrowinvoiceapply']);
    }else if(this.backAction === 'approved'){
      this.router.navigate(['/pages/lafinance/borrowinvoiceapproved']);
    }


  }

}
