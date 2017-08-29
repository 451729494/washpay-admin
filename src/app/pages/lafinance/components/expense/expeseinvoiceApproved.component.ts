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
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";


@Component({
  selector: 'la-express-invoice-approved',
  templateUrl:'./expeseinvoiceApproved.html'
})
export class CorpExpeseInvoiceApproved implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public selected = [];

  public searchForm:FormGroup;
  public invoiceCode:AbstractControl;//单据编号
  public corpId:AbstractControl;//公司ID
  public approved:AbstractControl;//审核状态
  public status:AbstractControl;//状态

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public listCorpCustomer:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private corpCustomerService:CorpCustomerService, private corpExpeseInvoiceService:CorpExpeseInvoiceService, private authService:AuthService) {

    this.searchForm = fb.group({
      'corpId': [''],
      'invoiceCode': [''],
      'approved': [''],
      'status': [''],
    });

    this.corpId = this.searchForm.controls['corpId'];
    this.invoiceCode = this.searchForm.controls['invoiceCode'];
    this.approved = this.searchForm.controls['approved'];
    this.status = this.searchForm.controls['status'];
    this.status.setValue('1');
  }

  public ngOnInit():void {
    //加载所有的客户单位
    let params = new URLSearchParams();
    params.set('dispatchedCorpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllCustomer(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listCorpCustomer = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpExpeseInvoiceService.pageQuery(requestParam)
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
    requestParam.set('corpId', values['corpId']);
    requestParam.set('start', this.startDate.year +'-'+ Utils.formatTwo(this.startDate.month) +'-'+ Utils.formatTwo(this.startDate.day));
    requestParam.set('end',this.endDate.year +'-'+ Utils.formatTwo(this.endDate.month) +'-'+ Utils.formatTwo(this.endDate.day));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.corpExpeseInvoiceService.pageQuery(requestParam)
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
      this.router.navigate(['/pages/lafinance/expeseinvoiceview'], {
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

