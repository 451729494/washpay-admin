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
import {OrderreportService} from "../../../../services/report/orderreport.service";
import {SplitbillreportService} from "../../../../services/report/splitbillreport.service";

@Component({
  selector: 'la-splitbillreport-view',
  templateUrl: './splitbillreportView.html'
})
export class SplitbillreportView implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public curId = '';

  public shopId='';
  public createdDate='';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private splitbillreportService:SplitbillreportService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    this.shopId=this.acRoute.snapshot.queryParams["shopId"];
    this.createdDate=this.acRoute.snapshot.queryParams["createdDate"];
    console.log(this.curId);
  }

  public ngOnInit():void {
    this.loadData();

  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lareport/chargeorderreport']);
  }

  public loadData(){

    if(this.shopId){
      console.log(this.shopId);
      let requestParam = new URLSearchParams();
      requestParam.set('shopId',this.shopId);
      requestParam.set('createdDate',this.createdDate);

      this.splitbillreportService.pageQuery(requestParam)
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




}

