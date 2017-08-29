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
import {UserWorkDayService} from "../../../../services/finance/userWorkDay.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {AuthService} from "../../../../services/auth.service";
import {DataImportComponent} from "../../../custom/dataimport-modal/dataimport-modal.component";

@Component({
  selector: 'la-employee-workday',
  templateUrl:'./employeeWorkday.html'
})
export class EmployeeWorkDay implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public editForm:FormGroup;
  public employeeCode:AbstractControl;//

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userWorkDayService:UserWorkDayService,private modalService: NgbModal, private authService:AuthService) {
    this.editForm = fb.group({
      'employeeCode': ['',],
    });

    this.employeeCode = this.editForm.controls['employeeCode'];
  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('employeeCode', this.employeeCode.value);
    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userWorkDayService.pageQuery(requestParam)
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

    requestParam.set('employeeCode', values['employeeCode']);

    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userWorkDayService.pageQuery(requestParam)
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
   let requestParam = new URLSearchParams();

   requestParam.set('employeeCode', this.employeeCode.value);
   requestParam.set('start', Utils.dateStructToString(this.startDate));
   requestParam.set('end', Utils.dateStructToString(this.endDate));
   requestParam.set('dispatchedCorpId', this.authService.getCorpId());

   requestParam.set('page', event.offset + 1);
   requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

   console.log(requestParam.toString());

   this.userWorkDayService.pageQuery(requestParam)
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


  toImport(){

    const customerModal = this.modalService.open(DataImportComponent, {size: 'lg'});
    customerModal.componentInstance.modalHeader = '员工考勤导入';
    customerModal.componentInstance.uploadFileUrl = '/open/common/uploadAtt';
    customerModal.componentInstance.dispatchedCorpId = this.authService.getCorpId();
    customerModal.result.then((result) => {

      console.log('result' +result);

    });

  }
}

