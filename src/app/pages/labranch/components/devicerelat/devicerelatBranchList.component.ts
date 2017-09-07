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
import {DevicerelatService} from "../../../../services/branch/devicerelat.service";


@Component({
  selector: 'la-devicerelatBranchList-query',
  templateUrl:'./devicerelatBranchList.html'
})
export class DevicerelatBranchList implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public address:AbstractControl;
  public curId:AbstractControl;


  //public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private acRoute:ActivatedRoute, private branchService:BranchService,private devicerelatService:DevicerelatService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'address': [''],
    });

    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];

    this.name = this.searchForm.controls['name'];
    this.address = this.searchForm.controls['address'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
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

  public toDelete(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('id', curId);
    this.branchService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toAdd() {

    this.router.navigate(['/pages/labranch/branchAdd'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/labranch/branchAdd'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toView(curId) {
    this.router.navigate(['/pages/labranch/branchView'], {queryParams: {paramId: curId}});
  }

  public bind(branchId) {
    let requestParam = new URLSearchParams();
    requestParam.set('id', this.curId+'');
    requestParam.set('branchId',branchId);
    this.devicerelatService.bind(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.router.navigate(['/pages/labranch/devicerelat']);
        } else {
          alert(res.message);
        }
      });
  }

  public toBack(){
    this.router.navigate(['/pages/labranch/devicerelat']);
  }

  setPage(event){

  }

}

