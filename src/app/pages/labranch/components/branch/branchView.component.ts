/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {BranchService} from "../../../../services/branch/branch.service";


@Component({
  selector: 'la-branch-view',
  templateUrl: './branchView.html'
})
export class BranchView implements OnInit{

  public curId = '';

  public branch:any;


  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private branchService:BranchService) {

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
    this.router.navigate(['/pages/labranch/branch']);
  }

  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.branchService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.branch = res.data;
          }else {

          }
        });
    }
  }




}

