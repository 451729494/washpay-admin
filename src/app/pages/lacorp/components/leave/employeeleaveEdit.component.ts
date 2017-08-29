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
import { Keys,Utils} from '../../../../services/models/env';

import {AuthService} from "../../../../services/auth.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpExpeseInvoiceService} from "../../../../services/finance/corpExpeseInvoice.service";
import {UserAccountBorrowService} from "../../../../services/finance/userAccountBorrow.service";
import {CorpEmployeeLeaveService} from "../../../../services/corp/corpEmployeeLeave.service";
import {CorpEmployeeService} from "../../../../services/corp/corpEmployee.service";

@Component({
  selector: 'la-employee-leave-edit',
  templateUrl:'./employeeleaveEdit.html'
})
export class CorpEmployeeLeaveEdit {

  public rows:Array<any> [];

  public curId:string = '';

  //
  public editForm:FormGroup;
  public leavedReason:AbstractControl;//

  public calcStart:NgbDateStruct;
  public calcEnd:NgbDateStruct;
  public leavedDate:NgbDateStruct;

  public employee:any;

  public corpEmployeeLeave:any;

  public curEmployeeId = '';



  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpEmployeeLeaveService:CorpEmployeeLeaveService,private corpEmployeeService:CorpEmployeeService, private authService:AuthService) {

    this.editForm = fb.group({
      'leavedReason': ['',Validators.compose([Validators.required])],
    });

    this.leavedReason = this.editForm.controls['leavedReason'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    this.curEmployeeId = this.route.snapshot.queryParams["employeeId"];

  }

  public ngOnInit():void {


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      console.log('sssss');
      this.corpEmployeeLeaveService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

             this.employee = res.data.employee;
             this.corpEmployeeLeave = res.data;
             this.curEmployeeId =  this.employee.id;

            if(res.data.leavedDate){
              this.leavedDate = Utils.toDateStruct(res.data.leavedDate);
            }

            if(res.data.calcStart){
              this.calcStart = Utils.toDateStruct(res.data.calcStart);
            }

            if(res.data.calcEnd){
              this.calcEnd = Utils.toDateStruct(res.data.calcEnd);
            }

             this.leavedReason.setValue(res.data.leavedReason);

          }
        } else {
          console.log(res.message);
        }
      });

    }

    if(this.curEmployeeId){
      let params = new URLSearchParams();
      params.set('id', this.curEmployeeId );

      this.corpEmployeeService.find(params).subscribe(res => {
           this.employee = res.data;
      });
    }

  }

  public toAdd(values:Object){

    if(this.editForm.valid){

      let body = {
        'id': this.curId,
         'employee': {id: this.curEmployeeId},
        'leavedDate': this.leavedDate.year +'-'+ Utils.formatTwo(this.leavedDate.month) +'-'+ Utils.formatTwo(this.leavedDate.day),
        'calcStart': this.calcStart.year +'-'+ Utils.formatTwo(this.calcStart.month) +'-'+ Utils.formatTwo(this.calcStart.day),
        'calcEnd': this.calcEnd.year +'-'+ Utils.formatTwo(this.calcEnd.month) +'-'+ Utils.formatTwo(this.calcEnd.day),
        'leavedReason': values['leavedReason'],
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.corpEmployeeLeaveService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/lacorp/employeeleave']);

  }

}
