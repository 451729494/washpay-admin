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
import {CorpSalaryInvoiceService} from "../../../../services/finance/corpSalaryInvoice.service";

@Component({
  selector: 'la-salary-invoice-edit',
  templateUrl:'./salaryinvoiceEdit.html'
})
export class CorpSalaryInvoiceEdit {

  public rows:Array<any> [];

  public curId:string = '';


  //
  public editForm:FormGroup;
  public month:AbstractControl;//时薪
  public corpId:AbstractControl;//时薪
  public description:AbstractControl;//备注
  public status:AbstractControl;//状态


  public listCorpCustomer:Array<any>;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpCustomerService:CorpCustomerService, private corpSalaryInvoiceService:CorpSalaryInvoiceService, private authService:AuthService) {

    this.editForm = fb.group({
      'month': ['',Validators.compose([Validators.required])],
      'corpId': ['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'description': ['',],
    });


    this.month = this.editForm.controls['month'];
    this.corpId = this.editForm.controls['corpId'];

    this.description = this.editForm.controls['description'];
    this.status = this.editForm.controls['status'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

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


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpSalaryInvoiceService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            this.month.setValue(res.data.month);
            this.corpId.setValue(res.data.custCorp.id);
            this.status.setValue(res.data.status);
            this.description.setValue(res.data.description);

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
        'month': values['month'],
        'custCorp':{id: values['corpId']},
        'status': values['status'],
        'description': values['description'],
        'dispatchedCorpId': this.authService.getCorpId(),
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.corpSalaryInvoiceService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){
          if(!this.curId){
            this.curId = res.data;
            this.toBack();
          }
        }else {
          console.log(res.message);
        }
      });
    }

  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/salaryinvoice']);

  }

}
