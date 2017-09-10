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
import {ChargeorderService} from "../../../../services/chargeoder/chargeorder.service";

@Component({
  selector: 'la-chargeorderreport-view',
  templateUrl: './chargeorderreportView.html'
})
export class ChargeorderrepotView implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public curId = '';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private chargeService:ChargeorderService) {

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
    this.router.navigate(['/pages/lareport/chargeorderreport']);
  }

  public loadData(){

    console.log(this.curId+"day");

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('dayStr',this.curId);

      this.chargeService.pageQueryByDay(requestParam)
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

