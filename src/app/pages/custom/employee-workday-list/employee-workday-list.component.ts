/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';


import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys,Utils} from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {UserAccountBorrowService} from "../../../services/finance/userAccountBorrow.service";
import {UserWorkDayService} from "../../../services/finance/userWorkDay.service";
import {CorpCustomerService} from "../../../services/corp/corpCustomer.service";

@Component({
  selector: 'la-employee-workday',
  templateUrl:'./employee-workday-list.html'
})
export class EmployeeWorkDayComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  @Input()
  public dispatchedCorpId = '';

  @Input()
  public employeeCode = '';


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userWorkDayService:UserWorkDayService) {

  }

  public ngOnInit():void {



    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('employeeCode', this.employeeCode);
    requestParam.set('dispatchedCorpId', this.dispatchedCorpId);

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

  }
}

