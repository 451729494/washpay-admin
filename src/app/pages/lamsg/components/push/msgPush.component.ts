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
import {MsgPushService} from "../../../../services/msg/msgPush.service";


@Component({
  selector: 'la-msg-push-',
  templateUrl:'./msgPush.html'
})
export class MsgPushQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private msgPushService:MsgPushService,private busiTypeService:BusiTypeService,private _dateParser:NgbDateParserFormatter) {

  }

  public ngOnInit():void {


    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.msgPushService.pageQuery(requestParam)
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

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.msgPushService.pageQuery(requestParam)
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
      this.msgPushService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }

  public toAdd() {

    this.router.navigate(['/pages/lamsg/msgpushedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }

  //
  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lamsg/msgpushedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  setPage(event){

  }

}

