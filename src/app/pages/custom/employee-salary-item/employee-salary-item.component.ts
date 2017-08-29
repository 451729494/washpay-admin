/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Keys,Utils} from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {UserCorpSalaryItemService} from "../../../services/finance/userCorpSalaryItem.service";

@Component({
  selector: 'la-employee-salary-item',
  templateUrl:'./employee-salary-item.html'
})
export class EmployeeCorpSalaryItemComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public salaryMonthId = '';


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,private activeModal: NgbActiveModal,   private userCorpSalaryItemService:UserCorpSalaryItemService) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('monthSalaryId', this.salaryMonthId);

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    console.log(requestParam.toString());

    this.userCorpSalaryItemService.findByMonthSalaryId(requestParam)
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


  closeModal(){

    console.log('close result');

    this.activeModal.close('');
    //return this.imageUrl;
  }

  setPage(event){

  }

}

