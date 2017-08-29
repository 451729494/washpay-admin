/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys,Utils } from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {RecruitService} from "../../../../services/recruit/recruit.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-recruit-approved',
  templateUrl:'./recruitApproved.html'
})
export class RecruitApproved implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;
  public category:AbstractControl;
  public status:AbstractControl;
  public statusHot:AbstractControl;

  public createdDate:NgbDateStruct;
  public updatedDate:NgbDateStruct;

  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private recruitService:RecruitService,private busiTypeService:BusiTypeService,private authService:AuthService, private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'category': [''],
      'status': [''],
      'statusHot': [''],
    });

    this.name = this.searchForm.controls['name'];
    this.category = this.searchForm.controls['category'];
    this.status = this.searchForm.controls['status'];
    this.statusHot = this.searchForm.controls['statusHot'];

    this.status.setValue('1');
  }

  public ngOnInit():void {

    let paramType = new URLSearchParams();
    paramType.set('code', 'zp');

    this.busiTypeService.findAll(paramType).subscribe(res =>{
      if(res.successed === '00'){
        this.categoryList = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('blogCategory.id', this.category.value);
    requestParam.set('status', this.status.value);
    requestParam.set('statusHot', this.statusHot.value);
    requestParam.set('createdDate', Utils.dateStructToString(this.createdDate));
    requestParam.set('modified', Utils.dateStructToString(this.updatedDate));
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

  public onSubmit(values:Object) {

    let requestParam = new URLSearchParams();
    requestParam.set('name', values['name']);
    requestParam.set('busiType.id',  values['category']);
    requestParam.set('status', values['status']);
    requestParam.set('statusHot', values['statusHot']);
    requestParam.set('createdDate', Utils.dateStructToString(this.createdDate));
    requestParam.set('modified', Utils.dateStructToString(this.updatedDate));
    requestParam.set('corp.id', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

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
        backAction:'approved'
      }
    });
  }

  public toHot(curId) {
    if (curId) {
      let requestParam = new URLSearchParams();
      requestParam.set('id', curId);

      console.log(requestParam.toString());

      this.recruitService.toHot(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            console.log(res.message);
          }
        });
    }
  }

  setPage(event){
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('blogCategory.id', this.category.value);
    requestParam.set('status', this.status.value);
    requestParam.set('statusHot', this.statusHot.value);
    requestParam.set('createdDate', Utils.dateStructToString(this.createdDate));
    requestParam.set('modified', Utils.dateStructToString(this.updatedDate));
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

}

