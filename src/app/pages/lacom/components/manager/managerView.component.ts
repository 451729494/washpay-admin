/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {ManagerService} from "../../../../services/corp/manager.service";


@Component({
  selector: 'la-manager-view',
  templateUrl: './managerView.html'
})
export class ManagerView implements OnInit{

  public curId = '';

  public manager:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private managerService:ManagerService) {

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
    this.router.navigate(['/pages/lacom/manager']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.managerService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.manager = res.data;
          }else {

          }
        });
    }
  }

}

