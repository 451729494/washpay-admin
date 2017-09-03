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
import {BranchService} from "../../../../services/branch/branch.service";

@Component({
  selector: 'la-ordinary-query',
  templateUrl:'./ordinaryList.html'
})
export class OrdinaryList implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public connectPhone:AbstractControl;
  public companyName:AbstractControl;

  public branchId = '';



  public constructor(fb:FormBuilder, private router:Router,private acRoute:ActivatedRoute, private ordinaryService:OrdinaryService,private branchService:BranchService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'connectPhone': [''],
      'companyName': ['']
    });



    this.connectPhone = this.searchForm.controls['connectPhone'];
    this.companyName = this.searchForm.controls['companyName'];

    //直接获取参数
    this.branchId = this.acRoute.snapshot.queryParams["paramId"];

    console.log("list branchId==" + this.branchId);
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

  public toChoose(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('branchId', this.branchId);
    requestParam.set('ordinaryId',curId);

    this.branchService.bindOrdinary(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.router.navigate(['/pages/labranch/branchrelatord']);
        } else {
          alert(res.message);
        }
      });
  }

  public toBack(){
    this.router.navigate(['/pages/labranch/branchrelatord']);
  }

  setPage(event){

  }

}

