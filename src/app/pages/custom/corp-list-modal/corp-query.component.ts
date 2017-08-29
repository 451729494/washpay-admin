/**
 * Created by hevan on 2017/5/9.
 */

import {Component,OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import {CorpService} from "../../../services/corp/corp.service";

import {PageDataModel} from "../../../services/models/page.model";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'corp-query-list',
  templateUrl:'./corp-query.component.html'
})
export class CorpSelectComponent implements OnInit{

  public rows:Array<any> = [];
  public selected = [];
  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public name:AbstractControl;

  public modalHeader: string = "选着公司";


  public constructor(fb:FormBuilder,private router: Router,private corpService : CorpService,private activeModal: NgbActiveModal) {

    this.searchForm = fb.group({
      'name': [''],
    });

    this.name = this.searchForm.controls['name'];


  }

  public ngOnInit():void {
    this.loadData();

  }



  public loadData(){
    let requestParam = new URLSearchParams();
    requestParam.set('name',this.name.value);

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.corpService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message);
        }
      });
  }
  public onSubmit(values:Object){

    let requestParam = new URLSearchParams();
    requestParam.set('name',values['name']);

    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.corpService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message);
        }
      });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  setPage(event){

  }

  closeModal() {

    if (this.selected.length > 0) {
      let selectData = this.selected[0];
      let data= {id:selectData.id, name:selectData.name, imageUrl:selectData.imageUrl};
      this.activeModal.close(JSON.stringify(data));

      //return this.imageUrl;
    }else{
      this.activeModal.close('');
    }
  }
}

