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
import {DiscountcouponService} from "../../../../services/discountcoupon/discountcoupon.service";


@Component({
  selector: 'la-discountcoupon-query',
  templateUrl:'./discountcoupon.html'
})
export class DiscountcouponQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public discountsMoney:AbstractControl;
 // public status:AbstractControl;


 // public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private discountcouponService:DiscountcouponService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'discountsMoney': [''],
     // 'status': [''],
    });



    this.discountsMoney = this.searchForm.controls['discountsMoney'];
    //this.status = this.searchForm.controls['status'];


  }

  public ngOnInit():void {

    // this.consumorderService.findAll().subscribe(res =>{
    //   if(res.successed === '00'){
    //     this.categoryList = res.data;
    //   }else {
    //     console.log(res.message);
    //   }
    // });
  console.log("============")
    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    // requestParam.set('adsPos.id', this.category.value);
    // requestParam.set('status', this.status.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.discountcouponService.pageQuery(requestParam)
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

    requestParam.set('discountsMoney',  values['discountsMoney']);
    console.log("buyao1"+values['discountsMoney']);
    //requestParam.set('status', values['status']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.discountcouponService.pageQuery(requestParam)
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
    this.discountcouponService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toAdd() {

    this.router.navigate(['/pages/lapromotion/discountcouponAdd'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    console.log("123");
    if (curId) {
      this.router.navigate(['/pages/lapromotion/discountcouponEdit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toView(curId) {
    console.log(curId+"==============")
    this.router.navigate(['/pages/lapromotion/discountcouponView'], {queryParams: {paramId: curId}});
    console.log(curId+"--------------");
  }


  setPage(event){

  }

}

