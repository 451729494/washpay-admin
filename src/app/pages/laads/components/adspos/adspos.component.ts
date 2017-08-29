import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys } from '../../../../services/models/env';
import {PageDataModel} from "../../../../services/models/page.model";
import {AdsPosService} from "../../../../services/ads/adsPos.service";

@Component({
  selector: 'la-adspos-query',
  templateUrl: './adspos.html'
})
export class AdsPosQuery implements OnInit{

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public constructor(fb:FormBuilder,private router: Router,private adsPosService:AdsPosService) {


    this.loadData();
  }

  public ngOnInit():void {

  }

  public toDelete(curId):any {
    let requestParam = new URLSearchParams();
    requestParam.set('id',curId);
    this.adsPosService.delete(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.loadData();

        }else{
          alert(res.message);
        }
      });
  }

  public toEdit(curId):any {
    this.router.navigate(['/pages/laads/adsposedit'], {queryParams: {paramId: curId}});
  }

  public toAdd():any {
    this.router.navigate(['/pages/laads/adsposedit'], {queryParams: {paramId: ''}});
  }

  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');
    this.adsPosService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }
      });
  }

  setPage(event){

  }
}
