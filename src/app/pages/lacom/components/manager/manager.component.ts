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
import {ManagerService} from "../../../../services/corp/manager.service";

@Component({
  selector: 'la-manager-query',
  templateUrl:'./manager.html'
})
export class ManagerQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;



  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private managerService:ManagerService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'mobile': [''],
      'email': ['']
    });



    this.name = this.searchForm.controls['name'];
    this.mobile = this.searchForm.controls['mobile'];
    this.email = this.searchForm.controls['email'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('mobile', this.mobile.value);
    requestParam.set('email', this.email.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.managerService.pageQuery(requestParam)
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
    requestParam.set('mobile', values['mobile']);
    requestParam.set('email', values['email']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.managerService.pageQuery(requestParam)
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
    this.managerService.delete(requestParam)
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
    this.router.navigate(['/pages/lacom/manageredit'], {queryParams: {paramId: curId}});
  }

  public toAdd() {
    this.router.navigate(['/pages/lacom/manageredit'], {queryParams: {paramId: ''}});
  }
  setPage(event){

  }

}

