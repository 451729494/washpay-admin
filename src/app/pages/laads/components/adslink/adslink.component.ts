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
import {AdsPosService} from "../../../../services/ads/adsPos.service";
import {AdsLinkService} from "../../../../services/ads/adsLink.service";


@Component({
  selector: 'la-adslink-query',
  templateUrl:'./adslink.html'
})
export class AdsLinkQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;

  public category:AbstractControl;
  public status:AbstractControl;


  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private adsLinkService:AdsLinkService,private adsPosService:AdsPosService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'category': [''],
      'status': [''],
    });



    this.category = this.searchForm.controls['category'];
    this.status = this.searchForm.controls['status'];


  }

  public ngOnInit():void {

    this.adsPosService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.categoryList = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('adsPos.id', this.category.value);
    requestParam.set('status', this.status.value);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.adsLinkService.pageQuery(requestParam)
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

    requestParam.set('adsPos.id',  values['category']);
    requestParam.set('status', values['status']);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.adsLinkService.pageQuery(requestParam)
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
      this.adsLinkService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }



  public toAdd() {

    this.router.navigate(['/pages/laads/adslinkedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/laads/adslinkedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }


  setPage(event){

  }

}

