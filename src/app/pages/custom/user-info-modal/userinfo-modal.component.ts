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
import {UserService} from "../../../services/user.service";
import {UserInfoService} from "../../../services/user/userInfo.service";
import {UserAccountService} from "../../../services/finance/userAccount.service";

@Component({
  selector: 'la-user-info-modal',
  templateUrl:'./userinfo-modal.html'
})
export class UserInfoComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  @Input()
  public userId = '';

  public userInfo:any;

  public userAccount:any;

  public user:any;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userService:UserService, private userInfoService:UserInfoService,private userAccountService:UserAccountService ) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {

    let params = new URLSearchParams();
    params.set('id', this.userId);
    params.set('userId', this.userId);

    console.log(params.toString());

    this.userService.find(params)
      .subscribe(res => {
        if (res.successed === '00') {
         this.user = res.data;
        } else {
          console.log(res.message);
        }
      });

    this.userInfoService.find(params)
      .subscribe(res => {
        if (res.successed === '00') {
          this.userInfo = res.data;
        } else {
          console.log(res.message);
        }
      });

    this.userAccountService.find(params)
      .subscribe(res => {
        if (res.successed === '00') {
          this.userAccount = res.data;
        } else {
          console.log(res.message);
        }
      });


  }


}

