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
import {CommercialService} from "../../../../services/commercial/commercial.service";
import {EntityListComponent} from "../../../custom/entity-list-modal/entity-list.component";

@Component({
  selector: 'la-commercial-add',
  templateUrl:'./commercialAdd.html'
})
export class CommercialAdd {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';


  //
  public commercialForm:FormGroup;
  public name:AbstractControl;
  public address:AbstractControl;
  //public organizationCode:AbstractControl;
  public city:AbstractControl;
  public email:AbstractControl;
  public remark:AbstractControl;
  public phone:AbstractControl;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router,  private commercialService:CommercialService, private modalService: NgbModal, private authService:AuthService) {

    this.commercialForm = fb.group({
      'name':['',Validators.compose([Validators.required])],
      'address': ['',Validators.compose([Validators.required])],
     // 'organizationCode': ['',Validators.compose([Validators.required])],
      'city': ['',Validators.compose([Validators.required])],
      'email': ['',Validators.compose([Validators.required])],
      'remark': ['',Validators.compose([Validators.required])],
      'phone': ['',Validators.compose([Validators.required])]
    });

    this.name = this.commercialForm.controls['name'];
    this.address = this.commercialForm.controls['address'];
   // this.organizationCode= this.commercialForm.controls['organizationCode'];
    this.city= this.commercialForm.controls['city'];
    this.email= this.commercialForm.controls['email'];
    this.remark= this.commercialForm.controls['remark'];
    this.phone= this.commercialForm.controls['phone'];

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
      this.commercialService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.name.setValue(res.data.name);
            this.address.setValue(res.data.address);
           // this.organizationCode.setValue(res.data.organizationCode)
            this.city.setValue(res.data.city)
            this.email.setValue(res.data.email)
            this.remark.setValue(res.data.remark)
            this.phone.setValue(res.data.phone)
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

    if(this.commercialForm.valid){
      let body = {
        'id': this.curId,
        'name': values['name'],
      //  'organizationCode': values['organizationCode'],
        'city': values['city'],
        'address': values['address'],
        'email': values['email'],
        'remark': values['remark'],
        'phone': values['phone']
      };

      this.commercialService.save(JSON.stringify(body)).subscribe(res=> {
        if(res.successed === '00'){

            this.router.navigate(['/pages/lacom/commercial']);

        }else {
          console.log(res.message);
        }
      });
    }

  }

  public onSelect(event){


  }

  public toBack(){

    this.router.navigate(['/pages/lacom/commercial']);

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
