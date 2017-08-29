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
import {UserAccountDepositService} from "../../../services/finance/userAccountDeposit.service";

@Component({
  selector: 'la-user-deposit-modal',
  templateUrl:'./userdeposit-list.html'
})
export class UserAccountDepositComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  @Input()
  public userId = '';

  @Input()
  public dispatchedCorpId = '';

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userAccountDepositService:UserAccountDepositService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('user.id', this.userId);
    requestParam.set('dispatchedCorpId', this.dispatchedCorpId);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userAccountDepositService.pageQuery(requestParam)
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

