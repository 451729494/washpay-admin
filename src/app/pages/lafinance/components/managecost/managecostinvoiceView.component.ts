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
import {ManageCostInvoiceService} from "../../../../services/finance/manageCostInvoice.service";
import {ManageCostMonthItemService} from "../../../../services/finance/manageCostMonthItem.service";

@Component({
  selector: 'la-manage-cost-invoice-view',
  templateUrl:'./managecostinvoiceView.html'
})
export class ManageCostInvoiceView {

  public rows:Array<any> [];

  public pageNav = new PageDataModel();

  public curId:string = '';

  public expeseInvoice:any;

  public backAction = 'query';

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private manageCostMonthItemService:ManageCostMonthItemService,  private manageCostInvoiceService:ManageCostInvoiceService, private authService:AuthService) {


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];
    this.backAction = this.route.snapshot.queryParams["backAction"];

  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.manageCostInvoiceService.find(params).subscribe(res => {
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

    this.manageCostMonthItemService.pageQuery(requestParam)
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
    this.router.navigate(['/pages/lafinance/costmonthitemedit'], {
      queryParams: {
        'paramId': curItemId,
        'manageCostId': this.curId
      }
    });
  }

  public toDeleteItem(curItemId){
    let requestParam = new URLSearchParams();
    requestParam.set('id', curItemId);

    this.manageCostMonthItemService.delete(requestParam)
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
      this.router.navigate(['/pages/lafinance/costinvoiceapply']);
    }else if(this.backAction === 'approved'){
      this.router.navigate(['/pages/lafinance/costinvoiceapproved']);
    }else if(this.backAction === ''){

      this.router.navigate(['/pages/lafinance/costinvoice']);
    }

  }

  setPage(event){

  }
}
