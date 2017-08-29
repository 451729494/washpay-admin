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
import {CorpEmployeeLeaveService} from "../../../../services/corp/corpEmployeeLeave.service";


@Component({
  selector: 'la-employee-leave-apply',
  templateUrl:'./employeeleaveApply.html'
})
export class CorpEmployeeLeaveApply implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

 public selected =[];

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private corpEmployeeLeaveService:CorpEmployeeLeaveService, private corpCustomerService:CorpCustomerService, private authService:AuthService,private _dateParser:NgbDateParserFormatter) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('checkUser.approved', '1');
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpEmployeeLeaveService.pageQuery(requestParam)
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
      this.router.navigate(['/pages/lacorp/employeeleaveview'], {
        queryParams: {
          paramId: curId,
          backAction: 'apply'
        }
      });
    }
  }


  public toApproved(curId) {
    var data = [];
    if(curId){
      data = [curId];
    }else if(this.selected.length > 0){

      for(let m =0 ;m < this.selected.length;m++){
        let item = this.selected[m];
        data.push(item.id);
      }
    }

    let params = {
      ids:data,
      userId:this.authService.getUserId()
    }

    this.corpEmployeeLeaveService.toApprove(JSON.stringify(params))
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        }

        if(res.error){
          alert(res.message);
        }
      });

  }


  setPage(event){
  }

  onSelect(event){
    console.log(event);
  }
}

