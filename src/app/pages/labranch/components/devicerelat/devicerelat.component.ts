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
  selector: 'la-devicerelat-query',
  templateUrl:'./devicerelat.html'
})
export class DevicerelatQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public branchId:AbstractControl;

  public branchList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private branchService:BranchService,private devicerelatService:DevicerelatService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'address': [''],
      'branchId': ['']
    });


    this.branchId = this.searchForm.controls['branchId']

    this.branchService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.branchList = res.data;
      }else {
        console.log(res.message);
      }
    });


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.devicerelatService.pageQuery(requestParam)
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

    requestParam.set('branchId', values['branchId']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.devicerelatService.pageQuery(requestParam)
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
    this.devicerelatService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toAdd() {

    this.router.navigate(['/pages/labranch/devicerelatedit']);
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

  public unBind(curId){
    let requestParam = new URLSearchParams();
    requestParam.set('id', curId);
    this.devicerelatService.unbind(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });
  }

  public toBind(curId) {
    this.router.navigate(['/pages/labranch/devicerelatbranchlist'], {queryParams: {paramId: curId}});
  }

  setPage(event){

  }

}

