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
import {CorpExpeseMonthItemService} from "../../../../services/finance/corpExpeseMonthItem.service";

@Component({
  selector: 'la-expese-invoice-view',
  templateUrl:'./expeseinvoiceView.html'
})
export class CorpExpeseInvoiceView {

  public rows:Array<any> [];

  public pageNav = new PageDataModel();

  public curId:string = '';

  public expeseInvoice:any;

  public backAction = 'query';

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpExpeseMonthItemService:CorpExpeseMonthItemService, private corpExpeseInvoiceService:CorpExpeseInvoiceService, private authService:AuthService) {


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];
    this.backAction = this.route.snapshot.queryParams["backAction"];

  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpExpeseInvoiceService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.expeseInvoice = res.data;

          }
        } else {
          console.log(res.message);
        }
      });

     this.loadData();

    }

  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('corpExpeseId', this.curId);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpExpeseMonthItemService.pageQuery(requestParam)
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

  public toAddItem(curItemId){
    this.router.navigate(['/pages/lafinance/expesemonthitemedit'], {
      queryParams: {
        'paramId': curItemId,
        'corpExpeseId': this.curId
      }
    });
  }

  public toDeleteItem(curItemId){
    let requestParam = new URLSearchParams();
    requestParam.set('id', curItemId);

    this.corpExpeseMonthItemService.delete(requestParam)
      .subscribe(res => {
      if (res.successed === '00') {

        this.loadData();

      } else {
        console.log(res.message);
      }
    });
  }

  public toBack() {

    if(this.backAction === 'apply'){
      this.router.navigate(['/pages/lafinance/expeseinvoiceapply']);
    }else if(this.backAction === 'approved'){
      this.router.navigate(['/pages/lafinance/expeseinvoiceapproved']);
    }else{
      this.router.navigate(['/pages/lafinance/expeseinvoice']);
    }

  }


  setPage(event){

  }
}
