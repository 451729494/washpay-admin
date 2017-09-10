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
import {CommercialService} from "../../../services/commercial/commercial.service";
import {BranchService} from "../../../services/branch/branch.service";
import {SplitbillService} from "../../../services/splitbill/splitbill.service";


@Component({
  selector: 'la-splitcommercial-query',
  templateUrl:'./splitCommAdd.html'
})
export class SplitCommercialQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public organizationCode:AbstractControl;

  public branchId = '';


  public constructor(fb:FormBuilder, private router:Router,private acRoute:ActivatedRoute, private commercialService:CommercialService,private splitbillService:SplitbillService,private branchService:BranchService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'organizationCode': [''],
    });



    this.name = this.searchForm.controls['name'];
    this.organizationCode = this.searchForm.controls['organizationCode'];

    //直接获取参数
    this.branchId = this.acRoute.snapshot.queryParams["paramId"];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    requestParam.set('branchId',this.branchId+'');

    this.commercialService.pageQueryNotBindBranchId(requestParam)
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
    requestParam.set('organizationCode', values['organizationCode']);
    requestParam.set('branchId',this.branchId+'');

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.commercialService.pageQueryNotBindBranchId(requestParam)
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

  public addComm(curId) {

    let requestParam = new URLSearchParams();
    requestParam.set('commId', curId);
    requestParam.set('branchId', this.branchId+'');

    this.splitbillService.addCommcial(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });


  }

  public toBack(){

    this.router.navigate(['/pages/lasplit/splitbranch'], {queryParams: {paramId: this.branchId}});

  }



  setPage(event){

  }

}

