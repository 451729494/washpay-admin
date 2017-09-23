/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import {PageDataModel} from "../../../../services/models/page.model";

import { Keys } from '../../../../services/models/env';
// import {ChargeorderrepotService} from "../../../../services/report/chargeorderrepot.service";
// import {ChargeorderService} from "../../../../services/chargeoder/chargeorder.service";
import {WithdrawService} from "../../../../services/report/withdraw.service";

@Component({
  selector: 'la-withdrawreport-view',
  templateUrl: './withdrawreportView.html'
})
export class WithdrawreportView implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public curId = '';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private withdrawService:WithdrawService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    console.log(this.curId);
  }

  public ngOnInit():void {
    this.loadData();

  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lareport/withdrawreport']);
  }

  public loadData(){

    console.log(this.curId+"day");

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('dayStr',this.curId);

      this.withdrawService.pageQueryByDay(requestParam)
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
  }

  setPage(event){
    let requestParam = new URLSearchParams();
    requestParam.set('dayStr',this.curId);

    requestParam.set('page', event.offset + 1);
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.withdrawService.pageQueryByDay(requestParam)
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



}

