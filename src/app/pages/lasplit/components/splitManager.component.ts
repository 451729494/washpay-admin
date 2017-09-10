/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {OrdinaryService} from "../../../services/ordinary/ordinary.service";

import {SplitbillService} from "../../../services/splitbill/splitbill.service";

@Component({
  selector: 'la-splitmanager-query',
  templateUrl:'./splitManagerAdd.html'
})
export class SplitManagerQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public mobile:AbstractControl;
  public email:AbstractControl;
  public branchId = '';



  public constructor(fb:FormBuilder, private router:Router,private acRoute:ActivatedRoute, private ordinaryService:OrdinaryService,private  splitbillService:SplitbillService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'mobile': [''],
      'email': ['']
    });



    this.name = this.searchForm.controls['name'];
    this.mobile = this.searchForm.controls['mobile'];
    this.email = this.searchForm.controls['email'];

    //直接获取参数
    this.branchId = this.acRoute.snapshot.queryParams["paramId"];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('mobile', this.mobile.value);
    requestParam.set('email', this.email.value);
    requestParam.set('branchId',this.branchId);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.ordinaryService.pageQueryNotBindBranchId(requestParam)
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

    requestParam.set('branchId',this.branchId);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.ordinaryService.pageQueryNotBindBranchId(requestParam)
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

  public toBack(){

    this.router.navigate(['/pages/lasplit/splitbranch'], {queryParams: {paramId: this.branchId}});

  }
  public addManager(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('managerId', curId);
    requestParam.set('branchId', this.branchId+'');


    this.splitbillService.addManager(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });


  }

  setPage(event){

  }

}

