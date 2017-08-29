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
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";
import {UserWorkDayService} from "../../../../services/finance/userWorkDay.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {AuthService} from "../../../../services/auth.service";
import {SysMaintService} from "../../../../services/corp/sysMaint.service";

@Component({
  selector: 'la-maint-query',
  templateUrl:'./maint.html'
})
export class SysMaintQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public editForm:FormGroup;
  public maintType:AbstractControl;//
  public status:AbstractControl;//

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private sysMaintService:SysMaintService,private authService:AuthService) {
    this.editForm = fb.group({
      'maintType': ['',],
      'status': ['',],
    });

    this.maintType = this.editForm.controls['maintType'];
    this.status = this.editForm.controls['status'];
  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('maintType', this.maintType.value);
    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());
    requestParam.set('status', this.status.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.sysMaintService.pageQuery(requestParam)
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

    requestParam.set('maintType', values['maintType']);

    requestParam.set('start', Utils.dateStructToString(this.startDate));
    requestParam.set('end', Utils.dateStructToString(this.endDate));
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());

    requestParam.set('status', values['status']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.sysMaintService.pageQuery(requestParam)
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

  public toView(curId):any {
    this.router.navigate(['/pages/lamaint/sysmaintview'], {queryParams: {paramId: curId,'backAction':'maint'}});
  }

  setPage(event){

  }
}

