/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";


@Component({
  selector: 'la-borrow-invoice-approved',
  templateUrl:'./borrowinvoiceApproved.html'
})
export class UserAccountBorrowApproved implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();
  public selected = [];

  public searchForm:FormGroup;
  public invoiceCode:AbstractControl;//单据编号
  public mobile:AbstractControl;//公司ID
  public approved:AbstractControl;//审核状态
  public status:AbstractControl;//状态

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userAccountBorrowService:UserAccountBorrowService, private authService:AuthService) {

    this.searchForm = fb.group({
      'mobile': [''],
      'invoiceCode': [''],
      'approved': [''],
      'status': [''],
    });

    this.mobile = this.searchForm.controls['mobile'];
    this.invoiceCode = this.searchForm.controls['invoiceCode'];
    this.approved = this.searchForm.controls['approved'];
    this.status = this.searchForm.controls['status'];

    this.status.setValue('1');
  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.userAccountBorrowService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }

  public onSubmit(values:Object) {

    let requestParam = new URLSearchParams();
    requestParam.set('status', values['status']);
    requestParam.set('invoiceCode', values['invoiceCode']);
    requestParam.set('checkUser.approved', values['approved']);
    requestParam.set('user.mobile', values['mobile']);
    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end',Utils.dateStructToString(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userAccountBorrowService.pageQuery(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
  }



  public toView(curId) {
    if (curId) {
      this.router.navigate(['/pages/lafinance/borrowinvoiceview'], {
        queryParams: {
          paramId: curId,
          backAction:'approved'
        }
      });
    }
  }

  setPage(event){

  }

  onSelect(event){

  }

}

