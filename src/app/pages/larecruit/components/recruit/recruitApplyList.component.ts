/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthorityService} from "../../../../services/check/authority.service";
import {CorpManageService} from "../../../../services/corp/corpManage.service";
import {RecruitApplyService} from "../../../../services/recruit/recruitApply.service";

@Component({
  selector: 'la-recruit-apply-list',
  templateUrl: './recruitApplyList.html'
})
export class RecruitApplyListComponent implements OnInit{

  public rows:Array<any> = [];
  public pageNav = new PageDataModel();


  public selected = [];

  @Input()
  public recuritId = '';

  @Input()
  public status = '';

  public constructor(fb:FormBuilder,private router: Router,private userService : UserService,private recruitApplyService:RecruitApplyService) {

  }

  public ngOnInit():void {
    this.loadData();
  }


  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('recruitId',this.recuritId);
    requestParam.set('status',this.status);

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.recruitApplyService.pageQuery(requestParam)
    .subscribe(res =>{
      if(res.successed === '00'){
      this.rows = res.data;
      this.pageNav.totalElements = res.totalElements;
      this.pageNav.totalPages = res.totalPages;
      }else {
        console.log(res.message);
      }
    });
  }


  public toApply(curId) {
    var data = [];
    if(curId){
      data = [curId];
    }else if(this.selected.length > 0){

      for(let m =0 ;m < this.selected.length;m++){
        let item = this.selected[m];
        data.push(item.id);
      }
    }

    let params = {
      ids:data,
      approved:1
    }

    this.recruitApplyService.toApplyApprove(JSON.stringify(params))
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        }

        if(res.error){
          alert(res.message);
        }
      });

  }


  public toApproved(curId) {
    var data = [];
    if(curId){
      data = [curId];
    }else if(this.selected.length > 0){

      for(let m =0 ;m < this.selected.length;m++){
        let item = this.selected[m];
        data.push(item.id);
      }
    }

    let params = {
      ids:data,
      approved:2,
    }

    this.recruitApplyService.toApplyApprove(JSON.stringify(params))
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        }

        if(res.error){
          alert(res.message);
        }
      });

  }

  setPage(event){
    let requestParam = new URLSearchParams();
    requestParam.set('recruitId',this.recuritId);
    requestParam.set('status',this.status);

    requestParam.set('page',event.offset + 1);
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.recruitApplyService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message);
        }
      });
  }

  onSelect(event){
    console.log(event);
  }
}

