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
import {SysMaintCommentService} from "../../../../services/corp/sysMaintComment.service";

@Component({
  selector: 'la-maint-view',
  templateUrl:'./maintView.html'
})
export class SysMaintView implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public editForm:FormGroup;
  public description:AbstractControl;//

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public sysMaint:any;

  public curId='';
  public backAction='';

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private sysMaintService:SysMaintService,private sysMaintCommentService:SysMaintCommentService,private authService:AuthService) {
    this.editForm = fb.group({
      'description': ['',],
    });

    this.description = this.editForm.controls['description'];

    this.curId = this.route.snapshot.queryParams["paramId"];

    this.backAction = this.route.snapshot.queryParams["backAction"];
  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('id', this.curId);

    this.sysMaintService.find(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
         this.sysMaint = res.data;
        } else {
          console.log(res.message);
        }
      });

    //加载明细信息
    this.loadDataDetail();
  }

  public loadDataDetail() {
    let requestParam = new URLSearchParams();
    requestParam.set('sysMaintId', this.curId);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.sysMaintCommentService.pageQuery(requestParam)
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

    //let userInfo = this.authService.getProfile();

    let data = {
      'sysMaintId':this.curId,
      'description':values['description'],
      'repeatId':this.authService.getUserId(),
    }


    console.log(JSON.stringify(data));

    this.sysMaintCommentService.save(JSON.stringify(data))
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadDataDetail();
        } else {
          console.log(res.message);
        }
      });
  }

  public toBack():any {
    if(this.backAction === 'maint'){
      this.router.navigate(['/pages/lamaint/sysmaint']);
    }else{
      this.router.navigate(['/pages/lamaint/sysmaintcustservice']);
    }

  }

  setPage(event){

  }
}

