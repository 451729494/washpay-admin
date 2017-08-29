/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys,Utils} from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {CorpExpeseMonthItemService} from "../../../services/finance/corpExpeseMonthItem.service";

@Component({
  selector: 'la-employee-expese-month',
  templateUrl:'./employee-expese-month.html'
})
export class EmployeeExpeseMonthComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  @Input()
  public dispatchedCorpId = '';

  @Input()
  public employeeCode = '';

  @Input()
  public month = '';


  public listCorpCustomer = '';

  public constructor( private corpExpeseMonthItemService:CorpExpeseMonthItemService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('corpEmployee.code',this.employeeCode );
    requestParam.set('month',this.month );
    requestParam.set('dispatchedCorpId',this.dispatchedCorpId );

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.corpExpeseMonthItemService.pageQuery(requestParam)
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

  }
}

