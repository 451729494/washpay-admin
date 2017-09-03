/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {OrdinaryService} from "../../../../services/ordinary/ordinary.service";


@Component({
  selector: 'la-ordinary-view',
  templateUrl: './ordinaryView.html'
})
export class OrdinaryView implements OnInit{

  public curId = '';

  public ordinaryAdmin:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private ordinaryService:OrdinaryService) {

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
    this.router.navigate(['/pages/lacom/ordinary']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.ordinaryService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.ordinaryAdmin = res.data;
          }else {

          }
        });
    }
  }

}

