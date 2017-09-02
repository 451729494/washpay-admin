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
import {EmployeeService} from "../../../../services/corp/employee.service";


@Component({
  selector: 'la-employee-query',
  templateUrl:'./employee.html'
})
export class EmployeeQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public employName:AbstractControl;
  public mobile:AbstractControl;


  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private employeeService:EmployeeService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'employName': [''],
      'mobile': [''],
    });



    this.employName = this.searchForm.controls['employName'];
    this.mobile = this.searchForm.controls['mobile'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('employName', this.employName.value);
    requestParam.set('mobile', this.mobile.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.employeeService.pageQuery(requestParam)
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

    requestParam.set('employName',  values['employName']);
    requestParam.set('mobile', values['mobile']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.employeeService.pageQuery(requestParam)
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
    this.employeeService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toView(curId) {
    this.router.navigate(['/pages/lacom/employeeview'], {queryParams: {paramId: curId}});
  }

  public toEdit(curId) {

    this.router.navigate(['/pages/lacom/employeeedit'], {queryParams: {paramId: curId}});
  }

  public toAdd() {
    this.router.navigate(['/pages/lacom/employeeedit'], {queryParams: {paramId: ''}});
  }
  setPage(event){

  }

}

