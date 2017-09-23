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

  public commercialId='';
  public statisticsDate='';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private splitbillreportService:SplitbillreportService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    this.commercialId=this.acRoute.snapshot.queryParams["commercialId"];
    this.statisticsDate=this.acRoute.snapshot.queryParams["statisticsDate"];
    console.log(this.curId);
  }

  public ngOnInit():void {
    this.loadData();

  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lareport/splitbillreport']);
  }

  public loadData(){
    console.log("csrd");
    console.log(this.commercialId);
    if(this.commercialId){
      let requestParam = new URLSearchParams();
      requestParam.set('commercialId',this.commercialId);
      requestParam.set('statisticsDate',this.statisticsDate);

      this.splitbillreportService.pageQueryByCommercialId(requestParam)
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

    requestParam.set('commercialId',this.commercialId);
    requestParam.set('statisticsDate',this.statisticsDate);

    requestParam.set('page', event.offset + 1);
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.splitbillreportService.pageQueryByCommercialId(requestParam)
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

