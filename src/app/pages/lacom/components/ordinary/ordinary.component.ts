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
import {OrdinaryService} from "../../../../services/ordinary/ordinary.service";

@Component({
  selector: 'la-ordinary-query',
  templateUrl:'./ordinary.html'
})
export class OrdinaryQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public connectPhone:AbstractControl;
  public companyName:AbstractControl;



  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private ordinaryService:OrdinaryService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'connectPhone': [''],
      'companyName': ['']
    });



    this.connectPhone = this.searchForm.controls['connectPhone'];
    this.companyName = this.searchForm.controls['companyName'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('connectPhone', this.connectPhone.value);
    requestParam.set('companyName', this.companyName.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.ordinaryService.pageQuery(requestParam)
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

    requestParam.set('connectPhone',  values['connectPhone']);
    requestParam.set('companyName', values['companyName']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.ordinaryService.pageQuery(requestParam)
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
    this.ordinaryService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toView(curId) {
    this.router.navigate(['/pages/lacom/ordinaryview'], {queryParams: {paramId: curId}});
  }

  public toEdit(curId) {
    this.router.navigate(['/pages/lacom/ordinaryedit'], {queryParams: {paramId: curId}});
  }

  public toAdd() {
    this.router.navigate(['/pages/lacom/ordinaryedit'], {queryParams: {paramId: ''}});
  }
  setPage(event){

  }

}

