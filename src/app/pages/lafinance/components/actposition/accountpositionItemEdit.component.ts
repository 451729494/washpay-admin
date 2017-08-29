/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { Keys,Utils} from '../../../../services/models/env';
import {AccountPositionService} from "../../../../services/finance/accountPosition.service";

import {AuthService} from "../../../../services/auth.service";
import {AccountItemService} from "../../../../services/finance/accountItem.service";
import {AccountPositionItemService} from "../../../../services/finance/accountPositionItem.service";
import {AccountConstService} from "../../../../services/finance/accountConst.service";

@Component({
  selector: 'la-account-position-item-edit',
  templateUrl:'./accountpositionItemEdit.html'
})
export class AccountPositionItemEdit {


  public curId:string = '';

  //
  public editForm:FormGroup;

  public accountPositionItem;

  public calcSet:AbstractControl;//计算公式

  public calcSetName:AbstractControl;//时薪

  public curAccountConst:any;//系统财务常量
  public curCalcType:any;

  public curAccountItem:any;//其他科目常量

  public curAccountConstCode = '';
  public curCalcTypeCode = '';
  public curCalcTypeSign = '';

  public curAccountItemCode = '';//同级科目

  public listPostionAccountItem= [];

  public accountConstList= [];

  public calcTypeList=[];

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private accountConstService:AccountConstService, private accountPositionService:AccountPositionService,private accountPositionItemService: AccountPositionItemService, private authService:AuthService) {

    this.editForm = fb.group({
      'calcSet': ['',Validators.compose([Validators.required])],
      'calcSetName': ['',Validators.compose([Validators.required])],

    });

    this.calcSet = this.editForm.controls['calcSet'];
    this.calcSetName = this.editForm.controls['calcSetName'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];


    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.accountPositionItemService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.accountPositionItem = res.data;
            this.calcSet.setValue(this.accountPositionItem.calcSet);
            this.calcSetName.setValue(this.accountPositionItem.calcSetName);

            this.loadPositionAccountItem(this.accountPositionItem.accountPosition.id);

          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {

    this.accountConstService.findCalcSymbolic()
      .subscribe(res => {
        if (res.successed === '00') {
          this.calcTypeList = res.data;

        } else {
          console.log(res.message);
        }
      });



      let requestParam = new URLSearchParams();

      requestParam.set('dispatchedCorpId',this.authService.getCorpId());

      requestParam.set('page', '1');
      requestParam.set('itemsPerPage', '100');

      this.accountConstService.pageQuery(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
             this.accountConstList = res.data;
          } else {
            console.log(res.message);
          }
        });

  }


  public loadPositionAccountItem(curPositionId){
    //加载子科目
    let paramsItem = new URLSearchParams();
    paramsItem.set('accountPositionId', curPositionId);

    this.accountPositionItemService.findAllByAccountPosition(paramsItem).subscribe(res => {
      if (res.successed === '00') {
        if (res.data) {
          this.listPostionAccountItem = res.data;

          console.log(JSON.stringify(this.listPostionAccountItem));
        }
      } else {
        console.log(res.message);
      }
    });
  }


  toSumKemu(){
    this.calcSet.setValue('sum(' + this.accountPositionItem.accountItem.code+ ')');
    this.calcSetName.setValue('sum(' + this.accountPositionItem.accountItem.name+ ')');
  }

  public toSave(values){

    let params = {
      'id':this.curId,
      'calcSet':values['calcSet'],
      'calcSetName':values['calcSetName'],
    };

    this.accountPositionItemService.save(params).subscribe(res => {
      if (res.successed === '00') {
        this.toBack();
      } else {
        console.log(res.message);
      }
    });
  }
  public toClear(){
    this.calcSet.setValue('');
    this.calcSetName.setValue('');

  }

  onCalcTypeChange(selectedCondition:string){
    this.curCalcType = this.calcTypeList.find(curCalcType => curCalcType.code == selectedCondition);
  }

  onCalcTypeSignChange(selectedCondition:string){
    let curCalcSet = this.calcSet.value;
    let curCalcSetName = this.calcSetName.value;
    if(!curCalcSet){
      curCalcSet = '';
    }

    if(!curCalcSet){
      curCalcSetName = '';
    }

    if(selectedCondition){

        curCalcSet = curCalcSet + selectedCondition;
        curCalcSetName =  curCalcSetName + selectedCondition;

    }

    this.calcSet.setValue(curCalcSet);
    this.calcSetName.setValue(curCalcSetName);
  }

  onAccountConstChange(selectedCondition:string){
    this.curAccountConst = this.accountConstList.find(curAccountConst => curAccountConst.id == selectedCondition);
  }

  onAccountItemChange(selectedCondition:string){
    this.curAccountItem = this.listPostionAccountItem.find(curAccountItem => curAccountItem.id == selectedCondition);
  }

  public toAddCalcType(){

    let curCalcSet = this.calcSet.value;
    let curCalcSetName = this.calcSetName.value;
    if(!curCalcSet){
      curCalcSet = '';
    }

    if(!curCalcSet){
      curCalcSetName = '';
    }

    console.log(JSON.stringify(this.curCalcType));


    if(this.curCalcType){
        curCalcSet = curCalcSet + this.curCalcType.code ;
        curCalcSetName = curCalcSetName + this.curCalcType.code;
    }

    this.calcSet.setValue(curCalcSet);
    this.calcSetName.setValue(curCalcSetName);

  }

  toAddAccountConst(){
    let curCalcSet = this.calcSet.value;
    let curCalcSetName = this.calcSetName.value;
    if(!curCalcSet){
      curCalcSet = '';
    }

    if(!curCalcSet){
      curCalcSetName = '';
    }

    console.log(JSON.stringify(this.curAccountConst));


    if(this.curAccountConst){
      curCalcSet = curCalcSet + this.curAccountConst.code ;
      curCalcSetName = curCalcSetName + this.curAccountConst.name;
    }

    this.calcSet.setValue(curCalcSet);
    this.calcSetName.setValue(curCalcSetName);
  }


  toAddAccountItem(){
    let curCalcSet = this.calcSet.value;
    let curCalcSetName = this.calcSetName.value;
    if(!curCalcSet){
      curCalcSet = '';
    }

    if(!curCalcSet){
      curCalcSetName = '';
    }

    console.log(JSON.stringify(this.curAccountItem));


    if(this.curAccountItem){
      curCalcSet = curCalcSet + this.curAccountItem.accountItem.code ;
      curCalcSetName = curCalcSetName + this.curAccountItem.accountItem.name;
    }

    this.calcSet.setValue(curCalcSet);
    this.calcSetName.setValue(curCalcSetName);
  }

  public toBack() {

      this.router.navigate(['/pages/lafinance/accountpositionview'], {
        queryParams: {
          paramId: this.accountPositionItem.accountPosition.id
        }
      });

  }

}
