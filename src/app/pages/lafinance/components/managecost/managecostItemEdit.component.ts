/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {AccountItemService} from "../../../../services/finance/accountItem.service";
import {ManageCostMonthItemService} from "../../../../services/finance/manageCostMonthItem.service";

@Component({
  selector: 'la-manage-cost-monthitem-edit',
  templateUrl:'./managecostItemEdit.html'
})
export class ManageCostMonthItemEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public manageCostId:string = '';

  //
  public editForm:FormGroup;
  public code:AbstractControl;//单据编号
  public corpId:AbstractControl;//客户公司
  public employeeCode:AbstractControl;//员工编号
  public amount:AbstractControl;//底薪

  public accountItemId:AbstractControl;
  public description:AbstractControl;//备注
  public status:AbstractControl;//状态

  public createdDate:NgbDateStruct;// 单据日期


  public listCorpCustomer:Array<any>;

  public listAccountItem:Array<any>;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpCustomerService:CorpCustomerService, private manageCostMonthItemService:ManageCostMonthItemService,private accountItemService:AccountItemService, private authService:AuthService) {

    this.editForm = fb.group({
      'code': ['',Validators.compose([Validators.required])],
      'corpId': ['',Validators.compose([Validators.required])],
      'accountItemId':['',Validators.compose([Validators.required])],
      'amount': ['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'description': ['',],
    });

    this.code = this.editForm.controls['code'];
    this.accountItemId = this.editForm.controls['accountItemId'];
    this.corpId = this.editForm.controls['corpId'];
    this.amount = this.editForm.controls['amount'];
    this.description = this.editForm.controls['description'];
    this.status = this.editForm.controls['status'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    this.manageCostId = this.route.snapshot.queryParams["manageCostId"];

    let corpId = this.route.snapshot.queryParams["corpId"];

  }

  public ngOnInit():void {

   //加载所有的客户单位
    let params = new URLSearchParams();
    params.set('dispatchedCorpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllCustomer(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listCorpCustomer = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.accountItemService.findAllManage(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listAccountItem = res.data;
      }else {
        console.log(res.message);
      }
    });


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.manageCostMonthItemService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.code.setValue(res.data.code);
            this.corpId.setValue(res.data.corpId);
            this.amount.setValue(res.data.amount);

            this.accountItemId.setValue(res.data.accountItem.id);
            this.status.setValue(res.data.status);
            this.description.setValue(res.data.description);

            if(res.data.createdDate){
              this.createdDate = Utils.toDateStruct(res.data.createdDate);
            }

          }
        } else {
          console.log(res.message);
        }
      });

    }

  }

  public toAdd(values:Object){

    if(this.editForm.valid){

      let body = {
        'id': this.curId,
        'code': values['code'],
        'manageCostId': this.manageCostId,
        'handType': '1',
        'corpId': values['corpId'],
        'accountItem': {id:values['accountItemId']},
        'amount': values['amount'],
        'status': values['status'],
        'description': values['description'],
        'createdDate': Utils.dateStructToString(this.createdDate),
        'dispatchedCorpId': this.authService.getCorpId()
      };

      this.manageCostMonthItemService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){

            this.toBack();

        }else {
          console.log(res.message);
        }
      });
    }

  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/costinvoiceview'], {
        queryParams: {
          paramId: this.manageCostId
        }
      });

  }

}
