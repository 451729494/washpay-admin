/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {OrderreportService} from "../../../../services/report/orderreport.service";
import {SplitbillreportService} from "../../../../services/report/splitbillreport.service";


@Component({
  selector: 'la-ordinarysplitbillreport-query',
  templateUrl:'./ordinarysplitbillreport.html'
})
export class OrdinarysplitbillreportQuery implements OnInit {

  public rows:Array<any> = [];
  public pageNav = new PageDataModel();
  public searchForm:FormGroup;
  public userId = '';

  //public categoryList:Array<any>;

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private splitbillreportService:SplitbillreportService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
    });
  }

  public ngOnInit():void {
    this.loadData();
  }

  public loadData() {
    this.userId = JSON.parse(localStorage.getItem(Keys.KEY_USER)).user_id;
    let requestParam = new URLSearchParams();
    requestParam.set('userId', this.userId+'');
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.splitbillreportService.pageQueryByOrdin(requestParam)
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

    requestParam.set('name',  values['name']);
    requestParam.set('address', values['address']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

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

  public toDelete(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('id', curId);
    this.splitbillreportService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }

  public toAdd() {

    this.router.navigate(['/pages/labranch/branchAdd'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/labranch/branchAdd'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toView(commercialId,statisticsDate,splitBusiType) {
    this.router.navigate(['/pages/lareport/ordinarysplitbillreportview'], {queryParams: {commercialId: commercialId,statisticsDate: statisticsDate,splitBusiType:splitBusiType}});
  }


  setPage(event){
    let requestParam = new URLSearchParams();

    requestParam.set('name', this.name.value);
    requestParam.set('address', this.address.value);

    requestParam.set('page', event.offset + 1);
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

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

