/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {DiscountcouponService} from "../../../../services/discountcoupon/discountcoupon.service";


@Component({
  selector: 'la-discountcoupon-view',
  templateUrl: './discountcouponView.html'
})
export class DiscountcouponView implements OnInit{

  public curId = '';

  public discountCoupon:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private discountcouponService:DiscountcouponService) {

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];
  }

  public ngOnInit():void {
    this.loadData();

  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lapromotion/discountcoupon']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.discountcouponService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.discountCoupon = res.data;
          }else {

          }
        });
    }
  }




}

