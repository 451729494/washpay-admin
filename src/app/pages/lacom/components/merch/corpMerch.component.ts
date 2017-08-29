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
import {CorpService} from "../../../../services/corp/corp.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {CategoryService} from "../../../../services/blog/category.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";


@Component({
  selector: 'la-corp-merch-query',
  templateUrl:'./corpMerch.html'
})
export class CorpMerchQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;
  public corpType:AbstractControl;

  public corpTypeList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private corpService:CorpService,private busiTypeService:BusiTypeService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'corpType': [''],
    });


    this.name = this.searchForm.controls['name'];
    this.corpType = this.searchForm.controls['corpType'];

  }

  public ngOnInit():void {

    let requestParam = new URLSearchParams();
    requestParam.set('code', 'cp');

    this.busiTypeService.findAll(requestParam).subscribe(res =>{
      if(res.successed === '00'){
        this.corpTypeList = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('corpType.id', this.corpType.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpService.pageQuery(requestParam)
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
    requestParam.set('name', values['name']);
    requestParam.set('corpType.id',  values['corpType']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.corpService.pageQuery(requestParam)
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
      this.corpService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }



  public toAdd() {

    this.router.navigate(['/pages/lacom/corpmerchedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }

  public toSet(curId) {

    this.router.navigate(['/pages/lacom/corpmerchview'], {
      queryParams: {
        paramId: curId
      }
    });
  }
  //
  //
  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lacom/corpmerchedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }



  setPage(event){

  }

}

