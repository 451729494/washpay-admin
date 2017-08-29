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
import {CorpService} from "../../../../services/corp/corp.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {CategoryService} from "../../../../services/blog/category.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-patch-service-query',
  templateUrl:'./patchService.html'
})
export class PatchServiceQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;
  public corpType:AbstractControl;


  public corpTypeList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private corpCustomerService:CorpCustomerService,private busiTypeService:BusiTypeService,private authService:AuthService) {

    this.searchForm = fb.group({
      'name': [''],
      'corpType': ['']
    });


    this.name = this.searchForm.controls['name'];
    this.corpType = this.searchForm.controls['corpType'];

  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    requestParam.set('code', 'cp');

    this.busiTypeService.findAll(requestParam).subscribe(res =>{
      if(res.successed === '00'){
        this.corpTypeList = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('corp.name', this.name.value);

    requestParam.set('custCorp.id', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpCustomerService.pageQueryService(requestParam)
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

    requestParam.set('corp.name', this.name.value);
    requestParam.set('custCorp.id', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.corpCustomerService.pageQueryService(requestParam)
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

  setPage(event){

  }

  toView(curId){

  }

}

