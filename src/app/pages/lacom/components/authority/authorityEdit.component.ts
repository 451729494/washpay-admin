/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {AuthorityService} from "../../../../services/check/authority.service";


@Component({
  selector: 'la-authority-edit',
  templateUrl: './authorityEdit.html'
})
export class AuthorityEdit implements OnInit{

  public curId = '';
  public msg = '';

  public searchForm:FormGroup;
  public name:AbstractControl;
  public nameCn:AbstractControl;


  public isError:boolean =false;

  public roleList=[];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private userService : UserService,private authorityService:AuthorityService) {

    this.searchForm = fb.group({
      'name': ['',Validators.compose([Validators.required, Validators.minLength(4)])],
      'nameCn': ['',Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.searchForm.controls['name'];
    this.nameCn = this.searchForm.controls['nameCn'];

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
    this.router.navigate(['/pages/lacom/authority']);
  }


  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.authorityService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.nameCn.setValue(res.data.nameCn);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.searchForm.valid){

      let requestParam = {'id': this.curId,
       'name': values['name'],
      'nameCn': values['nameCn']};

      this.authorityService.save(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            this.toBack();
          }else {
            this.msg = res.message;
          }
        });
    }
  }

}

