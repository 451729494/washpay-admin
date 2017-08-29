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

@Component({
  selector: 'la-modal-user-borrow',
  templateUrl:'./userborrow-list.html'
})
export class UserAccountBorrowComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  @Input()
  public dispatchedCorpId = '';

  @Input()
  public employeeCode = '';

  @Input()
  public status = '';


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userAccountBorrowService:UserAccountBorrowService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('employee.code', this.employeeCode);
    requestParam.set('status', this.status);
    requestParam.set('dispatchedCorpId', this.dispatchedCorpId);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userAccountBorrowService.findByUser(requestParam)
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

