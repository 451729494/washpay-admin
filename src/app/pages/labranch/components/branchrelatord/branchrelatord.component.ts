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
import {BranchService} from "../../../../services/branch/branch.service";


@Component({
  selector: 'la-branchrelateord-query',
  templateUrl:'./branchrelatord.html'
})
export class BranchBind implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public address:AbstractControl;


  //public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private branchService:BranchService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'address': [''],
    });



    this.name = this.searchForm.controls['name'];
    this.address = this.searchForm.controls['address'];


  }

  public ngOnInit():void {

    // this.consumorderService.findAll().subscribe(res =>{
    //   if(res.successed === '00'){
    //     this.categoryList = res.data;
    //   }else {
    //     console.log(res.message);
    //   }
    // });
    console.log("============")
    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    // requestParam.set('adsPos.id', this.category.value);
    // requestParam.set('status', this.status.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.branchService.pageQuery(requestParam)
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

    requestParam.set('name',  values['name']);
    requestParam.set('address', values['address']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.branchService.pageQuery(requestParam)
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

  public toBind(curId) {
    console.log("branchId==="+curId)
    this.router.navigate(['/pages/labranch/ordinarylist'], {queryParams: {paramId: curId}});
  }

  public unBind(){

  }


  setPage(event){

  }

}

