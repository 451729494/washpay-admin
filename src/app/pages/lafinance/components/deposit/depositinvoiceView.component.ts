/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { Keys,Utils} from '../../../../services/models/env';

import {UserAccountDepositService} from "../../../../services/finance/userAccountDeposit.service";

@Component({
  selector: 'la-account-deposit-view',
  templateUrl:'./depositinvoiceView.html'
})
export class UserAccountDepositView {

  public rows:Array<any> [];

  public curId:string = '';

  //
  public userAccountDeposit:any;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userAccountDepositService:UserAccountDepositService) {

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

  }

  public ngOnInit():void {

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.userAccountDepositService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.userAccountDeposit = res.data;

          }
        } else {
          console.log(res.message);
        }
      });

    }

  }

  public toAdd(values:Object){


  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/accountdepositview']);

  }

}
