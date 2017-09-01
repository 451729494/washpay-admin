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
import {ChargeorderService} from "../../../../services/chargeoder/chargeorder.service";


@Component({
  selector: 'la-chargeorder-query',
  templateUrl:'./chargeorder.html'
})
export class ChargeorderQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public status:AbstractControl;
  public corderNo:AbstractControl;


  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private chargeorderService:ChargeorderService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'corderNo': [''],
      'status': [''],
    });



    this.corderNo = this.searchForm.controls['corderNo'];
    this.status = this.searchForm.controls['status'];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('status', this.status.value);
    requestParam.set('corderNo', this.corderNo.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.chargeorderService.pageQuery(requestParam)
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

    requestParam.set('corderNo',  values['corderNo']);
    requestParam.set('status', values['status']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.chargeorderService.pageQuery(requestParam)
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
    this.chargeorderService.delete(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        } else {
          alert(res.message);
        }
      });

  }



  public toView(curId) {
    console.log(curId+"==============")
    // this.router.navigate(['/pages/laorder/consumorderView'], {queryParams: {paramId: curId}});
    console.log(curId+"--------------")
  }


  setPage(event){

  }

}

