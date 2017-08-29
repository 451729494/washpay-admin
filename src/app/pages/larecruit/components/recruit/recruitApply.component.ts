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
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {RecruitService} from "../../../../services/recruit/recruit.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-recruit-apply',
  templateUrl:'./recruitApply.html'
})
export class RecruitApply implements OnInit {

  public rows:Array<any> = [];

  public selected = [];

  public pageNav = new PageDataModel();


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private recruitService:RecruitService,private authService:AuthService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('checkUser.approved', '1');
    requestParam.set('corp.id', this.authService.getCorpId());
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.recruitService.pageQuery(requestParam)
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


  public toView(curId) {
    this.router.navigate(['/pages/larecruit/recruitview'], {
      queryParams: {
        paramId: curId,
        backAction:'apply'
      }
    });

  }


  public toApprove(curId) {
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
      userId:this.authService.getUserId()
    }

    this.recruitService.toApprove(JSON.stringify(params))
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
    requestParam.set('checkUser.approved', '1');
    requestParam.set('corp.id', this.authService.getCorpId());
    requestParam.set('page', event.offset + 1);
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.recruitService.pageQuery(requestParam)
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

  onSelect(event){
    console.log(event);
  }

}

