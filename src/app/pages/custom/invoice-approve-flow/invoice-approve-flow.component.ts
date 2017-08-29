/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys,Utils} from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {CheckInvoiceFlowService} from "../../../services/check/checkInvoiceFlow.service";

@Component({
  selector: 'la-invoice-approve-flow',
  templateUrl:'./invoice-approve-flow.html'
})
export class InvoiceApproveFlowComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  @Input()
  public entityId = '';

  @Input()
  public invoiceType='';


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private checkInvoiceFlowService:CheckInvoiceFlowService) {

  }

  public ngOnInit():void {


    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('entityId', this.entityId);
    requestParam.set('invoiceType',this.invoiceType);

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

