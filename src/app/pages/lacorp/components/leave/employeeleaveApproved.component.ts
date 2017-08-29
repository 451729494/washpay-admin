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
  selector: 'la-employee-leave-approved',
  templateUrl:'./employeeleaveApproved.html'
})
export class CorpEmployeeLeaveApproved implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public selected = [];

  public searchForm:FormGroup;
  public corpId:AbstractControl;
  public realName:AbstractControl;
  public mobile:AbstractControl;
  public employeeCode:AbstractControl;
  public status:AbstractControl;
  public approved:AbstractControl;


  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public listCorpCustomer:Array<any>;

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private corpEmployeeLeaveService:CorpEmployeeLeaveService, private corpCustomerService:CorpCustomerService, private authService:AuthService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'corpId': [''],
      'realName': [''],
      'mobile': [''],
      'approved':[''],
      'employeeCode': [''],
      'status': [''],
    });

    this.corpId = this.searchForm.controls['corpId'];
    this.status = this.searchForm.controls['status'];
    this.approved = this.searchForm.controls['approved'];
    this.realName = this.searchForm.controls['realName'];
    this.mobile = this.searchForm.controls['mobile'];
    this.employeeCode = this.searchForm.controls['employeeCode'];

    this.approved.setValue('2');

  }

  public ngOnInit():void {

    //加载对应的用人单位
    let params = new URLSearchParams();
    params.set('dispatchedCorpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllByDispatchedCorpId(params).subscribe(res =>{
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
    requestParam.set('corpId', this.corpId.value);
    requestParam.set('checkUser.approved', this.approved.value);
    requestParam.set('status', this.status.value);
    requestParam.set('code', this.employeeCode.value);
    requestParam.set('user.realName', this.realName.value);
    requestParam.set('user.mobile', this.realName.value);
    requestParam.set('startDate', this._dateParser.format(this.startDate));
    requestParam.set('endDate', this._dateParser.format(this.endDate));
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

  public onSubmit(values:Object) {

    let requestParam = new URLSearchParams();
    requestParam.set('corpId', values['corpId']);
    requestParam.set('status', values['status']);
    requestParam.set('checkUser.approved', values['approved']);
    requestParam.set('code', values['employeeCode']);
    requestParam.set('user.realName', values['realName']);
    requestParam.set('user.mobile', values['mobile']);
    requestParam.set('startDate', this._dateParser.format(this.startDate));
    requestParam.set('endDate', this._dateParser.format(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

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
          backAction: 'approved'
        }
      });
    }
  }


  onSelect(event){

  }

  setPage(event){

  }

}

