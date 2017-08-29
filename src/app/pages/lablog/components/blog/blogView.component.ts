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
  selector: 'la-blog-view',
  templateUrl:'./blogView.html'
})
export class BlogView {

  public rows:Array<any> [];

  public curId:string = '';

  public backAction:string = '';

  public blog:any;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userPhotoService:UserPhotoService, private categoryService:CategoryService, private blogService:BlogService,private modalService: NgbModal, private authService:AuthService) {

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    //直接获取返回页面
    this.backAction = this.route.snapshot.queryParams["backAction"];

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.blogService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.blog = res.data;
          }
        } else {
          console.log(res.message);
        }
      });

    }
  }

  public ngOnInit():void {

  }

  public toBack() {

      if(this.backAction === 'query'){
        this.router.navigate(['/pages/lablog/blog']);
      }else if(this.backAction === 'apply'){
        this.router.navigate(['/pages/lablog/blogapply']);
      }else if(this.backAction === 'approved'){
        this.router.navigate(['/pages/lablog/blogapproved']);
      }


  }

}
