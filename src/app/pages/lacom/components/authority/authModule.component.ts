/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { PageDataModel } from '../../../../services/models/page.model';

import { UserService } from '../../../../services/user.service';
import {AuthorityService} from "../../../../services/check/authority.service";
import {ModuleService} from "../../../../services/check/module.service";
import {AuthModuleService} from "../../../../services/check/authModule.service";


@Component({
  selector: 'la-auth-module',
  templateUrl: './authModule.html'
})
export class AuthModuleEdit implements OnInit{

  public curId = '';
  public msg = '';

  public authority:any;

  public selected = [];

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private moduleService : ModuleService,private authModuleService: AuthModuleService,private authorityService:AuthorityService) {


    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

    this.pageNav.itemsPerPage = 100;
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

  public toSave():any {


    //find all select

    var data = [];

      for(let m =0 ;m < this.rows.length;m++){
        let item = this.rows[m];
        if(item.selChecked === true){
          data.push(item.id);
        }

      }

      let params = {
        ids:data,
        entityId:this.curId
      }

      this.authModuleService.save(params).subscribe(res=>{
        if(res.successed === '00') {

          alert('分配成功！');

          this.toBack();

        }else{
          this.msg = res.message;
        }

      });



  }

  public loadData(){
    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);


      this.authorityService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){

            this.authority = res.data;


          }else {
            this.msg = res.message;
          }
        });
    }

    let params = new URLSearchParams();

    params.set('authorityId',this.curId);

    params.set('page','1');
    params.set('itemsPerPage',this.pageNav.itemsPerPage +'');

    this.moduleService.pageQuery(params).subscribe( res => {
      if(res.successed === '00'){
        this.rows = res.data;
        this.pageNav.totalElements = res.totalElements;
        this.pageNav.totalPages = res.totalPages;
      }
    });

    let paramsSel = new URLSearchParams();

    paramsSel.set('authorityId',this.curId);

    this.authModuleService.findMoulesByAuthority(paramsSel).subscribe( res => {
      if(res.successed === '00'){
        this.selected = res.data;
      }
    });

  }

  public onSelect(event){
    console.log('selelct');
  }

  setPage(event){

  }

}

