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
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {AuthService} from "../../../../services/auth.service";



@Component({
  selector: 'la-account-position',
  templateUrl:'./accountposition.html'
})
export class AccountPosition implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public status:AbstractControl;//状态



  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private accountPositionService:AccountPositionService, private authService:AuthService) {

    this.searchForm = fb.group({
      'status': [''],
    });


    this.status = this.searchForm.controls['status'];

  }

  public ngOnInit():void {
    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('status', this.status.value);

    requestParam.set('dispatchedCorpId', this.authService.getCorpId());
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.accountPositionService.pageQuery(requestParam)
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
    requestParam.set('status', values['status']);
    requestParam.set('dispatchedCorpId', this.authService.getCorpId());


    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.accountPositionService.pageQuery(requestParam)
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
      this.accountPositionService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }




  public toAdd() {

    this.router.navigate(['/pages/lafinance/accountpositionedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lafinance/accountpositionedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toSet(curId) {
    if (curId) {
      this.router.navigate(['/pages/lafinance/accountpositionview'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  setPage(event){

  }

}

