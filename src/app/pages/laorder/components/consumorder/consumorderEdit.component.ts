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

import * as moment from 'moment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {ConsumorderService} from "../../../../services/consumorder/consumorder.service";

@Component({
  selector: 'la-consumorder-edit',
  templateUrl:'./consumorderEdit.html'
})
export class ConsumorderEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';


  //
  public adsLinkForm:FormGroup;
  public category:AbstractControl;
  public name:AbstractControl;
  public linkUrl='';
  public imageUrl:AbstractControl;
  public description:AbstractControl;
  public menuOrder:AbstractControl;
  public status:AbstractControl;
  public entityName='';
  public entityId='';

  public linkType = 0;

  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router,  private consumorderService:ConsumorderService, private modalService: NgbModal, private authService:AuthService) {

    this.adsLinkForm = fb.group({
      'category':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'imageUrl': ['',Validators.compose([Validators.required])],
      'description':['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'menuOrder': ['',Validators.compose([Validators.required])],

    });

    this.category = this.adsLinkForm.controls['category'];
    this.name = this.adsLinkForm.controls['name'];
    this.imageUrl = this.adsLinkForm.controls['imageUrl'];
    this.description = this.adsLinkForm.controls['description'];
    this.status = this.adsLinkForm.controls['status'];
    this.menuOrder = this.adsLinkForm.controls['menuOrder'];


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

      this.consumorderService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            if (res.data.adsPos) {
              this.category.setValue(res.data.adsPos.id);
            }

            this.name.setValue(res.data.name);
            this.description.setValue(res.data.description);

            //this.linkType.setValue(res.data.linkType);
            this.linkType = res.data.linkType;
            this.linkUrl= res.data.linkUrl;
            this.imageUrl.setValue(res.data.imageUrl);
            this.menuOrder.setValue(res.data.menuOrder);
            this.status.setValue(res.data.status);
            this.entityId = res.data.entityId;
            this.entityName= res.data.entityName;

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

    if(this.adsLinkForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'adsPos': {id: values['category']},
        'linkType': this.linkType,
        'linkUrl': this.linkUrl,
        'description': values['description'],
        'imageUrl': values['imageUrl'],
        'status': values['status'],
        'menuOrder': values['menuOrder'],
        'entityId': this.entityId,
        'entityName': this.entityName,
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.consumorderService.save(JSON.stringify(body)).subscribe(res=> {
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

    this.linkType = event;

  }

  public toBack(){

    this.router.navigate(['/pages/laads/adslink']);

  }

  public photoMainShow(){
    const mainModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    mainModal.componentInstance.modalHeader = '主图片';
    mainModal.componentInstance.entityId = this.curId;
    mainModal.componentInstance.entityName = 'blog';
    mainModal.result.then((result) => {

      console.log('result' +result);
      this.imageUrl.setValue(result);
    });
  }


}
