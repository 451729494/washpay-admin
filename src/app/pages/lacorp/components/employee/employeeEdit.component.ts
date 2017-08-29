/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { Keys,Utils} from '../../../../services/models/env';

import { NgbModal ,NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from "../../../../services/auth.service";
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";
import {CorpCustomerService} from "../../../../services/corp/corpCustomer.service";
import {CorpEmployeeService} from "../../../../services/corp/corpEmployee.service";

@Component({
  selector: 'la-corp-employee-edit',
  templateUrl:'./employeeEdit.html'
})
export class CorpEmployeeEdit {

  public rows:Array<any> [];

  public curId:string = '';
  //
  public employeeForm:FormGroup;
  public employeeCode:AbstractControl;
  public realName:AbstractControl;
  public mobile:AbstractControl;
  public corpId:AbstractControl;
  public headerUpCorpId:AbstractControl;
  public department:AbstractControl;
  public position:AbstractControl;
  public accountPositionId:AbstractControl;
  public status:AbstractControl;

  public categoryList:Array<any>;

  public startDate:NgbDateStruct;
  public endDate:NgbDateStruct;

  public listCorpCustomer:Array<any>;
  public ListAccountPosition:Array<any>;

  public ListCorpHeaderUp:Array<any>;


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private accountPositionService:AccountPositionService,private corpCustomerService:CorpCustomerService,private corpEmployeeService:CorpEmployeeService,private _dateParser:NgbDateParserFormatter, private authService:AuthService) {

    this.employeeForm = fb.group({
      'employeeCode':['',Validators.compose([Validators.required])],
      'realName': ['',Validators.compose([Validators.required])],
      'mobile': ['',Validators.compose([Validators.required])],
      'corpId': ['',Validators.compose([Validators.required])],
      'headerUpCorpId': ['',Validators.compose([Validators.required])],
      'department': ['',Validators.compose([Validators.required])],
      'position':['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'accountPositionId': ['',Validators.compose([Validators.required])],
    });

    this.employeeCode = this.employeeForm.controls['employeeCode'];
    this.realName = this.employeeForm.controls['realName'];
    this.mobile = this.employeeForm.controls['mobile'];
    this.corpId = this.employeeForm.controls['corpId'];
    this.headerUpCorpId = this.employeeForm.controls['headerUpCorpId'];
    this.department = this.employeeForm.controls['department'];
    this.position = this.employeeForm.controls['position'];
    this.status = this.employeeForm.controls['status'];
    this.accountPositionId = this.employeeForm.controls['accountPositionId'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

  }

  public ngOnInit():void {

    //加载对应的用人单位
    let params = new URLSearchParams();
    params.set('dispatchedCorpId',this.authService.getCorpId() );

    this.corpCustomerService.findAllByDispatchedCorpId(params).subscribe(res =>{
      if(res.successed === '00'){
        this.listCorpCustomer = res.data;
      }else {
        console.log(res.message);
      }
    });


    this.corpCustomerService.findAllByDispatchedCorpId(params).subscribe(res =>{
      if(res.successed === '00'){
        this.ListCorpHeaderUp = res.data;
      }else {
        console.log(res.message);
      }
    });

    //加载对应的财务薪资岗位
    this.accountPositionService.findAllByDispatchedCorp(params).subscribe(res =>{
      if(res.successed === '00'){
        this.ListAccountPosition = res.data;
      }else {
        console.log(res.message);
      }
    });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpEmployeeService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {


            this.corpId.setValue(res.data.corpId);


            this.employeeCode.setValue(res.data.code);
            this.realName.setValue(res.data.user.realName);
            this.mobile.setValue(res.data.user.mobile);
            this.position.setValue(res.data.position);

            if(res.data.accountPosition){
              this.accountPositionId.setValue(res.data.accountPosition.id);
            }

            this.department.setValue(res.data.department);
            this.status.setValue(res.data.status);

            this.headerUpCorpId.setValue(res.data.headerUpCorpId);

            if(res.data.startDate){
              this.startDate = Utils.toDateStruct(res.data.startDate);
            }

            if(res.data.endDate){
              this.endDate = Utils.toDateStruct(res.data.endDate);
            }

          }
        } else {
          console.log(res.message);
        }
      });

    }

  }

  public add(values:Object){

    if(this.employeeForm.valid){
        console.log(this.startDate.toString());
      let body = {
        'id': this.curId,
        'corpId': values['corpId'],
        'code': values['employeeCode'],
        'accountPosition': {id: values['accountPositionId']},
        'department': values['department'],
        'position': values['position'],
        'user':{realName:values['realName'],mobile:values['mobile']},
        'headerUpCorpId': values['headerUpCorpId'],
        'status': values['status'],
        'statusHot': values['statusHot'],
        'dispatchedCorpId': this.authService.getCorpId(),
        'startDate': this.startDate.year +'-'+ Utils.formatTwo(this.startDate.month) +'-'+ Utils.formatTwo(this.startDate.day),
        'endDate': this.endDate.year +'-'+ Utils.formatTwo(this.endDate.month) +'-'+ Utils.formatTwo(this.endDate.day),

        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.corpEmployeeService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){
          if(!this.curId){
            this.curId = res.data;
          }
        }else {
          console.log(res.message);
        }
      });
    }

  }

  public toBack() {

      this.router.navigate(['/pages/lacorp/employeequery']);

  }

}
