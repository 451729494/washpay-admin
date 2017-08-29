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
import {CorpService} from "../../../../services/corp/corp.service";

import * as moment from 'moment';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import '../../../editors/components/ckeditor/ckeditor.loader';
import 'ckeditor';
import 'style-loader!../../../editors/components/ckeditor/ckeditor.scss';
import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";

@Component({
  selector: 'la-corp-merch-edit',
  templateUrl:'./corpMerchEdit.html'
})
export class CorpMerchEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';

  public entityId = '';

  public entityName='';

  //
  public corpForm:FormGroup;
  public corpType:AbstractControl;
  public name:AbstractControl;
  public code:AbstractControl;
  public imageUrl:AbstractControl;

  public description:AbstractControl;
  public email:AbstractControl;
  public tel:AbstractControl;
  public city:AbstractControl;
  public street:AbstractControl;


  public corpTypeList:Array<any>;


  public registedDate;

  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public ckconfig = {
    uiColor: '#F0F3F4',
    height: '800',
  };

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userPhotoService:UserPhotoService, private busiTypeService:BusiTypeService, private corpService:CorpService,private modalService: NgbModal, private authService:AuthService) {

    this.corpForm = fb.group({
      'corpType':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'code': ['',Validators.compose([Validators.required])],
      'imageUrl': ['',],

      'description':['',Validators.compose([Validators.required])],
      'email': ['',Validators.compose([Validators.required])],
      'tel': ['',Validators.compose([Validators.required])],
      'city': ['',Validators.compose([Validators.required])],
      'street': ['',Validators.compose([Validators.required])],
    });

    this.corpType = this.corpForm.controls['corpType'];
    this.name = this.corpForm.controls['name'];
    this.code = this.corpForm.controls['code'];

    this.imageUrl = this.corpForm.controls['imageUrl'];
    this.description = this.corpForm.controls['description'];
    this.email = this.corpForm.controls['email'];
    this.tel = this.corpForm.controls['tel'];
    this.city = this.corpForm.controls['city'];
    this.street = this.corpForm.controls['street'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    //
    let paramType = new URLSearchParams();
    paramType.set('code', 'cp');

    this.busiTypeService.findAll(paramType).subscribe(res =>{
      if(res.successed === '00'){
        this.corpTypeList = res.data;
      }else {
        console.log(res.message);
      }
    });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            if (res.data.corpType) {
              this.corpType.setValue(res.data.corpType.id);

            }

            this.name.setValue(res.data.name);

            this.code.setValue(res.data.code);

            this.imageUrl.setValue(res.data.imageUrl);
            this.description.setValue(res.data.description);
            this.email.setValue(res.data.email);
            this.tel.setValue(res.data.tel);
            this.city.setValue(res.data.address.city);
            this.street.setValue(res.data.address.street);


            if(res.data.registedDate){
              this.registedDate = Utils.toDateStruct(res.data.registedDate);
            }

            this.ckeditorContent = res.data.content;

          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {


  }

  public addCorp(values:Object){

    if(this.corpForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'corpType': {id: values['corpType']},
        'code': values['code'],

        'description': values['description'],
        'imageUrl': values['imageUrl'],
        'email': values['email'],
        'tel': values['tel'],
        'address':{'city':values['city'],'street':values['street']},
        'registedDate':moment(this.registedDate).format("YYYY-MM-DD"),
        'content': this.ckeditorContent,
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.corpService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/lacom/corpmerch']);

  }

  public photoMainShow(){
    const mainModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    mainModal.componentInstance.modalHeader = '主图片';
    mainModal.componentInstance.entityId = this.curId;
    mainModal.componentInstance.entityName = 'corp';
    mainModal.result.then((result) => {

      console.log('result' +result);
      this.imageUrl.setValue(result);
    });
  }

  public photoDetailShow(){
    const photoDetailModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    photoDetailModal.componentInstance.modalHeader = '其它图片';
    photoDetailModal.componentInstance.entityId = this.curId;
    photoDetailModal.componentInstance.entityName = 'corp';

    photoDetailModal.result.then((result) => {

      console.log('result' +result);
      if(result){
        this.ckeditorContent.concat('<img src=\'' + result +'\'/>');
      }

    });
  }

}
