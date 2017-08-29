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
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {AuthService} from "../../../../services/auth.service";
import {AccountItemService} from "../../../../services/finance/accountItem.service";
import {AccountPositionItemService} from "../../../../services/finance/accountPositionItem.service";

@Component({
  selector: 'la-accountposition-view',
  templateUrl:'./accountpositionView.html'
})
export class AccountPositionView {

  public rows:Array<any> [];

  public curId:string = '';


  public accountPosition:any;

  public listAccountPositionItem = [];


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private accountItemService:AccountItemService,private accountPositionService:AccountPositionService,private accountPositionItemService: AccountPositionItemService,
                     private authService:AuthService) {
    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.accountPositionService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.accountPosition = res.data;

          }
        } else {
          console.log(res.message);
        }
      });

      //加载子科目
      let paramsItem = new URLSearchParams();
      paramsItem.set('accountPositionId', this.curId + '');

      this.accountPositionItemService.findAllByAccountPosition(paramsItem).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.listAccountPositionItem = res.data;
          }
        } else {
          console.log(res.message);
        }
      });
    }
  }

  public ngOnInit():void {


  }

  public toSet(curAccountPositionItem){
    this.router.navigate(['/pages/lafinance/accountpositionitemedit'], {
      queryParams: {
        paramId: curAccountPositionItem
      }
    });
  }

  public toBack() {
      this.router.navigate(['/pages/lafinance/accountposition']);
  }

}
