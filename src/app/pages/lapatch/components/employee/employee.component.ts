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
import {BlogService} from "../../../../services/blog/blog.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {CategoryService} from "../../../../services/blog/category.service";
import {CorpEmployeeService} from "../../../../services/corp/corpEmployee.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-patch-employee-query',
  templateUrl:'./employee.html'
})
export class PatchEmployeeQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  public searchForm:FormGroup;
  public corpId:AbstractControl;
  public accountPositionId:AbstractControl;
  public realName:AbstractControl;
  public mobile:AbstractControl;
  public employeeCode:AbstractControl;


  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public listCorpCustomer:Array<any>;
  public ListAccountPosition:Array<any>;

  selected=[];

  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,private modalService: NgbModal, private accountPositionService:AccountPositionService,private corpCustomerService:CorpCustomerService,private corpEmployeeService:CorpEmployeeService,private authService:AuthService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'corpId': [''],
      'realName': [''],
      'mobile': [''],
      'employeeCode': [''],
    });

    this.corpId = this.searchForm.controls['corpId'];
    this.realName = this.searchForm.controls['realName'];
    this.mobile = this.searchForm.controls['mobile'];
    this.employeeCode = this.searchForm.controls['employeeCode'];

  }

  public ngOnInit():void {

    //加载对应的用人单位
    let params = new URLSearchParams();
    params.set('corpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllServiceByPatchCorpId(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listCorpCustomer = res.data;
      }else {
        console.log(res.message);
      }
    });


    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('dispatchedCorpId', this.corpId.value);
    requestParam.set('status', '');
    requestParam.set('code', this.employeeCode.value);
    requestParam.set('user.realName', this.realName.value);
    requestParam.set('user.mobile', this.realName.value);
    requestParam.set('startDate', this._dateParser.format(this.startDate));
    requestParam.set('endDate', this._dateParser.format(this.endDate));
    requestParam.set('corpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.corpEmployeeService.pageQueryPatch(requestParam)
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
    requestParam.set('dispatchedCorpId', values['corpId']);
    requestParam.set('accountPosition.id',values['accountPositionId']);
    requestParam.set('status', '0');
    requestParam.set('code', values['employeeCode']);
    requestParam.set('user.realName', values['realName']);
    requestParam.set('user.mobile', values['mobile']);
    requestParam.set('startDate', this._dateParser.format(this.startDate));
    requestParam.set('endDate', this._dateParser.format(this.endDate));
    requestParam.set('corpId', this.authService.getCorpId());

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.corpEmployeeService.pageQueryPatch(requestParam)
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


  setPage(event){

  }

  onSelect(event){

  }

  toView(curId){
    if (curId) {
      this.router.navigate(['/pages/lapatch/patchemployeeview'], {
        queryParams: {
          paramId: curId,
          'backAction':'query',
        }
      });
    }
  }
}

