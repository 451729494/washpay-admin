/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbTimepickerModule,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys,Utils} from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {CheckInvoiceFlowService} from "../../../../services/check/checkInvoiceFlow.service";
import {CorpManageService} from "../../../../services/corp/corpManage.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'la-invoice-approve-history',
  templateUrl:'./approveHistory.html'
})
export class InvoiceApproveFlowHistory implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public editForm:FormGroup;
  public userId:AbstractControl;//

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public listManage = [];

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private checkInvoiceFlowService:CheckInvoiceFlowService, private corpManageService:CorpManageService, private authService:AuthService) {
    this.editForm = fb.group({
      'userId': ['',],
    });

    this.userId = this.editForm.controls['userId'];
  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    requestParam.set('corpId', this.authService.getCorpId());

    this.corpManageService.findAll(requestParam).subscribe(res => {
      if (res.successed === '00') {
        this.listManage = res.data;
      }
    });
    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('userId', this.userId.value);

    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.checkInvoiceFlowService.pageQuery(requestParam)
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

  public submit(values:Object) {
    let requestParam = new URLSearchParams();
    requestParam.set('userId', values['userId']);

    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.checkInvoiceFlowService.pageQuery(requestParam)
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

  setPage(event){

  }
}

