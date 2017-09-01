/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {ConsumorderService} from "../../../../services/consumorder/consumorder.service";


@Component({
  selector: 'la-consumorder-view',
  templateUrl: './consumorderView.html'
})
export class ConsumorderView implements OnInit{

  public curId = '';

  public consumOrder:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private consumorderService:ConsumorderService) {

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
    this.router.navigate(['/pages/laorder/consumorder']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.consumorderService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.consumOrder = res.data;
          }else {

          }
        });
    }
  }




}

