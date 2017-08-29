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
import {AccountConstService} from "../../../../services/finance/accountConst.service";
import {PageDataModel} from "../../../../services/models/page.model";


@Component({
  selector: 'la-account-const',
  templateUrl:'./accountconst.html'
})
export class AccountConst implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;//name
  public code:AbstractControl;//编号
  public calcType:AbstractControl;//固定值

  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private accountConstService:AccountConstService,private _dateParser:NgbDateParserFormatter) {


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', '100');

    this.accountConstService.pageQuery(requestParam)
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

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', 100 + '');
    console.log(requestParam.toString());

    this.accountConstService.pageQuery(requestParam)
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
    this.accountConstService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }


  //
  public toAdd() {

    this.router.navigate(['/pages/lafinance/accountconstedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lafinance/accountconstedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  setPage(event){

  }

}

