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
  public name:AbstractControl;
  public address:AbstractControl;
  public longitude:AbstractControl;
  public dimensionality:AbstractControl;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router,  private branchService:BranchService, private modalService: NgbModal, private authService:AuthService) {

    this.branchForm = fb.group({
      'name':['',Validators.compose([Validators.required])],
      'address': ['',Validators.compose([Validators.required])],
      'longitude': ['',Validators.compose([Validators.required])],
      'dimensionality': ['',Validators.compose([Validators.required])]
    });

    this.name = this.branchForm.controls['name'];
    this.address = this.branchForm.controls['address'];
    this.longitude = this.branchForm.controls['longitude'];
    this.dimensionality = this.branchForm.controls['dimensionality'];

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
      console.log(this.curId);
      params.set('id', this.curId + '');
      this.branchService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.name.setValue(res.data.name);
            this.address.setValue(res.data.address)
            this.longitude.setValue(res.data.longitude)
            this.dimensionality.setValue(res.data.dimensionality)
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
        'name': values['name'],
        'address': values['address'],
        'longitude': values['longitude'],
        'dimensionality': values['dimensionality'],
      };

      this.branchService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){

            this.router.navigate(['/pages/labranch/branch']);

        }else {
          console.log(res.message);
        }
      });
    }

  }

  public onSelect(event){


  }

  public toBack(){

    this.router.navigate(['/pages/labranch/branch']);

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
