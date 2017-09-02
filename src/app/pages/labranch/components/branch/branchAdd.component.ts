/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { UserPhotoService } from '../../../../services/user/userPhoto.service';
import { Keys,Utils} from '../../../../services/models/env';
import {CategoryService} from "../../../../services/blog/category.service";
import {BlogService} from "../../../../services/blog/blog.service";

import * as moment from 'moment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {BranchService} from "../../../../services/branch/branch.service";
import {EntityListComponent} from "../../../custom/entity-list-modal/entity-list.component";

@Component({
  selector: 'la-branch-add',
  templateUrl:'./branchAdd.html'
})
export class BranchAdd {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';


  //
  public branchForm:FormGroup;
  public beginDate:AbstractControl;
  public endDate:AbstractControl;
  public discountsMoney:AbstractControl;
  public identifiedCode:AbstractControl;
  public discountCount:AbstractControl;



  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router,  private branchService:BranchService, private modalService: NgbModal, private authService:AuthService) {

    this.branchForm = fb.group({
      'beginDate':['',Validators.compose([Validators.required])],
      'endDate': ['',Validators.compose([Validators.required])],
      'discountsMoney': ['',Validators.compose([Validators.required])],
      'identifiedCode':['',Validators.compose([Validators.required])],
      'discountCount': ['',Validators.compose([Validators.required])],

    });

    this.beginDate = this.branchForm.controls['beginDate'];
    this.endDate = this.branchForm.controls['endDate'];
    this.discountsMoney = this.branchForm.controls['discountsMoney'];
    this.identifiedCode = this.branchForm.controls['identifiedCode'];
    this.discountCount = this.branchForm.controls['discountCount'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    // this.consumorderService.findAll().subscribe(res =>{
    //   if(res.successed === '00'){
    //     this.categoryList = res.data;
    //   }else {
    //     console.log(res.message);
    //   }
    // });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.branchService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.beginDate.setValue(res.data.beginDate);
            this.endDate.setValue(res.data.endDate);
            this.discountsMoney.setValue(res.data.discountsMoney);
            this.identifiedCode = res.data.identifiedCode;
            this.discountCount= res.data.discountCount;
          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {


  }

  public add(values:Object){

    if(this.branchForm.valid){

      let body = {
        'id': this.curId,
        'beginDate': values['beginDate'],
        'endDate': values['endDate'],
        'discountsMoney': values['discountsMoney'],
        'discountCount': values['discountCount']

      };

      this.branchService.save(JSON.stringify(body)).subscribe(res=> {
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

  public onSelect(event){


  }

  public toBack(){

    this.router.navigate(['/pages/lapromotion/branch']);

  }

/*  public photoMainShow(){
    const mainModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    mainModal.componentInstance.modalHeader = '主图片';
    mainModal.componentInstance.entityId = this.curId;
    mainModal.componentInstance.entityName = 'blog';
    mainModal.result.then((result) => {

      console.log('result' +result);
      this.imageUrl.setValue(result);
    });
  }*/

/*  public openEntityShow(){
    const photoModal = this.modalService.open(EntityListComponent, {size: 'lg'});
    photoModal.componentInstance.modalHeader = '选择关联业务';
    photoModal.result.then((result) => {

      if(result.length > 1){

        let retData = JSON.parse(result);
        this.entityName=retData.entityName;
        this.entityId=retData.entityId;
        this.imageUrl=retData.imageUrl;
      }

    });
  }*/

}
