/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {DefaultModal} from "./modal/default-modal.component";

import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {SplitbillService} from "../../../services/splitbill/splitbill.service";
import {BranchService} from "../../../services/branch/branch.service";

@Component({
  selector: 'la-split',
  templateUrl:'./split.html'
})
export class SplitQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  // public searchForm:FormGroup;

  // public branchList:AbstractControl;

  // public branchId:AbstractControl;

  public branchIdParam = '';

  public branch:any;



  public constructor(fb:FormBuilder, private router:Router,private acRoute:ActivatedRoute, private splitbillService:SplitbillService,private branchService:BranchService,private modalService: NgbModal,private _dateParser:NgbDateParserFormatter) {

    // this.searchForm = fb.group({
    //   'branchId': ['']
    // });
    //
    // this.branchId = this.searchForm.controls['branchId'];


    // this.branchService.findAll().subscribe(res =>{
    //   if(res.successed === '00'){
    //     this.branchList = res.data;
    //   }else {
    //     console.log(res.message);
    //   }
    // });
    //
    this.branchIdParam =  this.acRoute.snapshot.queryParams["paramId"];

  }

  public ngOnInit():void {

    if(this.branchIdParam){
      let requestParam = new URLSearchParams();
      requestParam.set('branchId',this.branchIdParam);

      this.branchService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.branch = res.data;
          }else {

          }
        });
    }

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('branchId',this.branchIdParam+'');
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString())



    this.splitbillService.pageQuery(requestParam)
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

    requestParam.set('branchId',this.branchIdParam+'');
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.splitbillService.pageQuery(requestParam)
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

    console.log("=============== id ="+ curId);
    let requestParam = new URLSearchParams();
    requestParam.set('id', curId);
    this.splitbillService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toAdd() {

    this.router.navigate(['/pages/lapromotion/discountcouponAdd'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId,rate) {
    const activeModal = this.modalService.open(DefaultModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = '设置比例';
    activeModal.componentInstance.msg = curId;
    if(rate.length==2){
      activeModal.componentInstance.rate = rate.substring(0,1);
    }else if(rate.length==3){
      activeModal.componentInstance.rate = rate.substring(0,2);
    }else if (rate.length==4){
      activeModal.componentInstance.rate = rate.substring(0,3);
    }
    activeModal.result.then((result) => {

      this.loadData();

    });

  }

  public toView(curId) {
    this.router.navigate(['/pages/lapromotion/discountcouponView'], {queryParams: {paramId: curId}});
  }
  public toAddManager() {
    // this.router.navigate(['/pages/lapromotion/discountcouponView'], {queryParams: {paramId: curId}});
      this.router.navigate(['/pages/lasplit/splitmanage'], {queryParams: {paramId: this.branchIdParam+''}});

  }

  public toAddComm() {
  // this.router.navigate(['/pages/lapromotion/discountcouponView'], {queryParams: {paramId: curId}});
      this.router.navigate(['/pages/lasplit/splitcomm'], {queryParams: {paramId: this.branchIdParam+''}});

  }
  public toBack() {
  // this.router.navigate(['/pages/lapromotion/discountcouponView'], {queryParams: {paramId: curId}});
      this.router.navigate(['/pages/lasplit/split']);

  }


  setPage(event){

  }

}

