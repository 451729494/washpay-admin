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
  selector: 'la-bindedcommercial-query',
  templateUrl:'./bindedcommercial.html'
})
export class BindedCommercial implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public name:AbstractControl;
  public organizationCode:AbstractControl;
  public branchId = '';

  //public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private branchservice:BranchService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'organizationCode': [''],

    });

    //直接获取参数
    this.branchId = this.route.snapshot.queryParams["paramId"];

    this.name = this.searchForm.controls['name'];
    this.organizationCode = this.searchForm.controls['organizationCode'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    // requestParam.set('adsPos.id', this.category.value);
    requestParam.set('id', this.branchId);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam);
    this.branchservice.find(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data.commercialList;
          console.log(this.rows);
          this.pageNav.totalElements = this.rows.length;
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

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.branchservice.pageQuery(requestParam)
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
    console.log('sdp'+curId);
    console.log(requestParam);
    this.branchservice.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toAdd() {

    this.router.navigate(['/pages/lacom/commercialAdd'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lacom/commercialAdd'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toView(curId) {
    console.log(curId+"==============")
    this.router.navigate(['/pages/lacom/commercialView'], {queryParams: {paramId: curId}});
    console.log(curId+"--------------");
  }


  setPage(event){

  }

  public unBind(curId){
    let requestParam = new URLSearchParams();
    requestParam.set('comId',curId);
    requestParam.set('branchId', this.branchId);
    console.log(curId);

    this.branchservice.unBindCommercial(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          // this.router.navigate(['/pages/labranch/branchrelatord']);
          this.loadData();
        } else {
          alert(res.message);
        }
      });
  }

  public toBack(){
    this.router.navigate(['/pages/labranch/branchrelatcom']);
  }

  public toAddCommercial() {
    this.router.navigate(['/pages/labranch/unbindedcommercial'], {queryParams: {paramId: this.branchId}});
  }

}

