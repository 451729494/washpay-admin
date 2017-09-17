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
  selector: 'la-commsplitDetail-view',
  templateUrl: './commsplitDetail.html'
})
export class CommsplitDetail implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public curId = '';

  public commercialId='';
  public statisticsDate='';
  public splitBusiType ='';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private splitbillreportService:SplitbillreportService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
    this.commercialId=this.acRoute.snapshot.queryParams["commercialId"];
    this.statisticsDate=this.acRoute.snapshot.queryParams["statisticsDate"];
    this.splitBusiType=this.acRoute.snapshot.queryParams["splitBusiType"];


    console.log(this.curId);
  }

  public ngOnInit():void {
    this.loadData();

  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lareport/commsplit']);
  }

  public loadData(){
    console.log("csrd");
    console.log(this.commercialId);
    if(this.commercialId){
      let requestParam = new URLSearchParams();
      requestParam.set('commercialId',this.commercialId);
      requestParam.set('statisticsDate',this.statisticsDate);
      requestParam.set('type',this.splitBusiType);



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




}

