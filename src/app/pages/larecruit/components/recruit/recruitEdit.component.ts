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

import '../../../editors/components/ckeditor/ckeditor.loader';
import 'ckeditor';
import 'style-loader!../../../editors/components/ckeditor/ckeditor.scss';
import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {RecruitService} from "../../../../services/recruit/recruit.service";
import {CorpSelectComponent} from "../../../custom/corp-list-modal/corp-query.component";

@Component({
  selector: 'la-recruit-edit',
  templateUrl:'./recruitEdit.html'
})
export class RecruitEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';

  public entityId = '';

  public entityName='';

  //
  public recruitForm:FormGroup;
  public category:AbstractControl;
  public name:AbstractControl;
  public tag:AbstractControl;
  public city:AbstractControl;
  public address:AbstractControl;
  public salaryStart:AbstractControl;
  public salaryEnd:AbstractControl;
  public imageUrl:AbstractControl;
  public description:AbstractControl;
  public status:AbstractControl;
  public statusHot:AbstractControl;
  public count:AbstractControl;

  public corpName:AbstractControl;
  public corpId = '';

  public categoryList:Array<any>;

  public publishDate;

  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public ckconfig = {
    uiColor: '#F0F3F4',
    height: '800',
  };

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private busiTypeService:BusiTypeService, private recruitService:RecruitService,private modalService: NgbModal, private authService:AuthService) {

    this.recruitForm = fb.group({
      'category':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'tag': ['',Validators.compose([Validators.required])],
      'city': ['',Validators.compose([Validators.required])],
      'address': ['',Validators.compose([Validators.required])],
      'imageUrl': [''],
      'count': ['',Validators.compose([Validators.required])],
      'salaryStart': ['',Validators.compose([Validators.required])],
      'salaryEnd': ['',Validators.compose([Validators.required])],
      'description':['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'statusHot': ['',Validators.compose([Validators.required])],
    });

    this.category = this.recruitForm.controls['category'];
    this.name = this.recruitForm.controls['name'];
    this.tag = this.recruitForm.controls['tag'];
    this.city = this.recruitForm.controls['city'];
    this.address = this.recruitForm.controls['address'];
    this.salaryStart = this.recruitForm.controls['salaryStart'];
    this.salaryEnd = this.recruitForm.controls['salaryEnd'];
    this.imageUrl = this.recruitForm.controls['imageUrl'];
    this.description = this.recruitForm.controls['description'];
    this.count = this.recruitForm.controls['count'];
    this.status = this.recruitForm.controls['status'];
    this.statusHot = this.recruitForm.controls['statusHot'];

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    let paramType = new URLSearchParams();
    paramType.set('code', 'zp');

    this.busiTypeService.findAll(paramType).subscribe(res =>{
      if(res.successed === '00'){
        this.categoryList = res.data;
      }else {
        console.log(res.message);
      }
    });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.recruitService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            if (res.data.blogCategory) {
              this.category.setValue(res.data.busiType.id);

            }

            this.name.setValue(res.data.name);

            this.tag.setValue(res.data.tag);
            this.city.setValue(res.data.city);

            this.corpId = res.data.corp.id;

            this.count.setValue(res.data.count);

            this.salaryStart.setValue(res.data.salaryStart);
            this.salaryEnd.setValue(res.data.salaryEnd);

            this.imageUrl.setValue(res.data.imageUrl);

            this.description.setValue(res.data.description);

            this.status.setValue(res.data.status);
            this.statusHot.setValue(res.data.statusHot);
            this.ckeditorContent = res.data.content;

            if(res.data.publishDate){
              this.publishDate = Utils.toDateStruct(res.data.publishDate);
            }

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

    console.log(values);

    if(this.recruitForm.valid){

      console.log('star to save');
      let body = {
        'id': this.curId,
        'name': values['name'],
        'busiType': {id: values['category']},
        'tag': values['tag'],
        'city': values['city'],
        'address': values['address'],
        'description': values['description'],
        'salaryStart': values['salaryStart'],
        'salaryEnd': values['salaryEnd'],
        'count': values['count'],
        'corp': {id:this.authService.getCorpId()},
        'imageUrl': values['imageUrl'],
        'status': values['status'],
        'statusHot': values['statusHot'],
        'publishDate': Utils.dateStructToString(this.publishDate),
        'content': this.ckeditorContent,
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      console.log('star to save22');
      this.recruitService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/larecruit/recruit']);

  }

  public photoMainShow(){
    const mainModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    mainModal.componentInstance.modalHeader = '主图片';
    mainModal.componentInstance.entityId = this.curId;
    mainModal.componentInstance.entityName = 'recruit';
    mainModal.result.then((result) => {

      console.log('result' +result);
      this.imageUrl.setValue(result);
    });
  }

  public photoDetailShow(){
    const photoDetailModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    photoDetailModal.componentInstance.modalHeader = '其它图片';
    photoDetailModal.componentInstance.entityId = this.curId;
    photoDetailModal.componentInstance.entityName = 'recruit';

    photoDetailModal.result.then((result) => {

      console.log('result' +result);
      if(result){
        this.ckeditorContent.concat('<img src=\'' + result +'\'/>');
      }

    });
  }

  public corpShow(){
    const photoModal = this.modalService.open(CorpSelectComponent, {size: 'lg'});
    photoModal.componentInstance.modalHeader = 'Logo';
    photoModal.componentInstance.tagType = '0';
    photoModal.result.then((result) => {

      console.log('result' +result);
      if(result.length > 1){
        let data = JSON.parse(result);
        this.corpId = data.id;
        this.corpName.setValue(data.name);
      }


    });
  }

}
