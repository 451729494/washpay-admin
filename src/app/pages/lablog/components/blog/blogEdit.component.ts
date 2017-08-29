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

@Component({
  selector: 'la-blog-edit',
  templateUrl:'./blogEdit.html'
})
export class BlogEdit {

  public rows:Array<any> [];

  public curId:string = '';
  public parentId:string = '';

  public entityId = '';

  public entityName='';

  //
  public blogForm:FormGroup;
  public category:AbstractControl;
  public name:AbstractControl;
  public tag:AbstractControl;
  public author:AbstractControl;
  public imageUrl:AbstractControl;
  public description:AbstractControl;
  public status:AbstractControl;
  public statusHot:AbstractControl;

  public categoryList:Array<any>;

  public publishDate;

  public ckeditorContent:string = '<p>Hello CKEditor</p>';
  public ckconfig = {
    uiColor: '#F0F3F4',
    height: '800',
  };

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userPhotoService:UserPhotoService, private categoryService:CategoryService, private blogService:BlogService,private modalService: NgbModal, private authService:AuthService) {

    this.blogForm = fb.group({
      'category':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],
      'tag': ['',Validators.compose([Validators.required])],
      'author': ['',Validators.compose([Validators.required])],
      'imageUrl': ['',Validators.compose([Validators.required])],
      'description':['',Validators.compose([Validators.required])],
      'status': ['',Validators.compose([Validators.required])],
      'statusHot': ['',Validators.compose([Validators.required])],
    });

    this.category = this.blogForm.controls['category'];
    this.name = this.blogForm.controls['name'];
    this.tag = this.blogForm.controls['tag'];
    this.author = this.blogForm.controls['author'];
    this.imageUrl = this.blogForm.controls['imageUrl'];
    this.description = this.blogForm.controls['description'];
    this.status = this.blogForm.controls['status'];
    this.statusHot = this.blogForm.controls['statusHot'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    this.categoryService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.categoryList = res.data;
      }else {
        console.log(res.message);
      }
    });

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.blogService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            if (res.data.blogCategory) {
              this.category.setValue(res.data.blogCategory.id);

            }

            this.name.setValue(res.data.name);

            this.tag.setValue(res.data.tag);
            this.author.setValue(res.data.author);

            this.imageUrl.setValue(res.data.imageUrl);

            this.description.setValue(res.data.description);

            this.status.setValue(res.data.status);
            this.statusHot.setValue(res.data.statusHot);
            this.ckeditorContent = res.data.content;

            if(res.data.startDate){
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

  public addBlog(values:Object){

    if(this.blogForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'blogCategory': {id: values['category']},
        'author': values['author'],
        'tag': values['tag'],
        'description': values['description'],
        'imageUrl': values['imageUrl'],
        'status': values['status'],
        'statusHot': values['statusHot'],
        'publishDate': moment(this.publishDate).format("YYYY-MM-DD"),
        'content': this.ckeditorContent,
        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.blogService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/lablog/blog']);

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

  public photoDetailShow(){
    const photoDetailModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    photoDetailModal.componentInstance.modalHeader = '其它图片';
    photoDetailModal.componentInstance.entityId = this.curId;
    photoDetailModal.componentInstance.entityName = 'blog';

    photoDetailModal.result.then((result) => {

      console.log('result' +result);
      if(result){
        this.ckeditorContent.concat('<img src=\'' + result +'\'/>');
      }

    });
  }

}
