/**
 * Created by hevan on 2017/5/5.
 */
import {Component,Input,OnInit } from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {RecruitService} from "../../../services/recruit/recruit.service";
import {BlogService} from "../../../services/blog/blog.service";
import {CorpService} from "../../../services/corp/corp.service";

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html'
})
export class EntityListComponent implements OnInit{

  rows=[];
  selected=[];

  public modalHeader: string = "";

  public searchEntityForm:FormGroup;
  public searchName:AbstractControl;
  public entityName:AbstractControl;
  public entityId = '';


  public pageNav = new PageDataModel();

  public constructor(fb:FormBuilder, private activeModal: NgbActiveModal,  private blogService:BlogService, private recruitService:RecruitService, private corpService:CorpService) {

    this.searchEntityForm = fb.group({
      'searchName': ['',],
      'entityName': ['',],
    });

    this.searchName = this.searchEntityForm.controls['searchName'];
    this.entityName = this.searchEntityForm.controls['entityName'];
  }
  public ngOnInit():void {

    this.loadSearchData();
  }

  public loadSearchData() {

    if (!this.entityName.value || (this.entityName.value && this.entityName.value.length < 1)) {
      return;
    }
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.entityName.value);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage+'');

    let strEntityName = this.entityName.value;
    if (strEntityName === 'corp') {
      this.corpService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    } else if (strEntityName === 'recruit') {
      this.recruitService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    } else if (strEntityName === 'blog') {
      this.blogService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    }

  }

  public onSearchEntity(values:Object) {

    let requestParam = new URLSearchParams();
    requestParam.set('name', values['searchName']);
    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    let strEntityName = this.entityName.value;
    if (strEntityName === 'corp') {
      this.corpService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    } else if (strEntityName === 'recruit') {
      this.recruitService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    } else if (strEntityName === 'blog') {
      this.blogService.pageQuery(requestParam).subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });
    }


  }

  setPage(event){

  }

  onSelect(selected){

    console.log(selected);

    this.selected.push(selected);

  }

  closeModal(){

    console.log(this.selected);

    if (this.selected.length) {

      let selectData = this.selected[0];
      console.log(" length 1")

      let data= {entityId:selectData.id, entityName:this.entityName.value, imageUrl:selectData.imageUrl};
      //return this.imageUrl;
      console.log(data)
      this.activeModal.close( JSON.stringify(data));
    }else{
      console.log(' length 0');
      this.activeModal.close( '');
    }

    //return this.imageUrl;
  }



}
