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
// import {BranchService} from "../../../../services/branch/branch.service";
import {DeviceService} from "../../../../services/device/device.service";

@Component({
  selector: 'la-device-query',
  templateUrl:'./device.html'
})
export class DeviceQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public address:AbstractControl;


  //public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private deviceService:DeviceService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'address': [''],
    });



    this.name = this.searchForm.controls['name'];
    this.address = this.searchForm.controls['address'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('offset', this.pageNav.page + '');
    requestParam.set('limit', this.pageNav.itemsPerPage + '');

    this.deviceService.pageQuery(requestParam)
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

    requestParam.set('offset', this.pageNav.page + '');
    requestParam.set('limit', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.deviceService.pageQuery(requestParam)
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
    this.deviceService.delete(requestParam)
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


  setPage(event){
    let requestParam = new URLSearchParams();

    requestParam.set('name', this.name.value);
    requestParam.set('address', this.address.value);

    requestParam.set('offset', event.offset + 1);
    requestParam.set('limit', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.deviceService.pageQuery(requestParam)
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
