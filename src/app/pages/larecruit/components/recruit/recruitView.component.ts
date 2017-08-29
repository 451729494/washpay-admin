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
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {RecruitService} from "../../../../services/recruit/recruit.service";
import {CorpSelectComponent} from "../../../custom/corp-list-modal/corp-query.component";

@Component({
  selector: 'la-recruit-view',
  templateUrl:'./recruitView.html'
})
export class RecruitView {

  public rows:Array<any> [];

  public curId:string = '';
  public backAction = '';

  public parentId:string = '';

  //
  public recruit;

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private busiTypeService:BusiTypeService, private recruitService:RecruitService,private modalService: NgbModal, private authService:AuthService) {

    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

    this.backAction = this.route.snapshot.queryParams["backAction"];

    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.recruitService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
             this.recruit = res.data;
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
        this.router.navigate(['/pages/larecruit/recruit']);
      }else if(this.backAction === 'apply'){
        this.router.navigate(['/pages/larecruit/recruitapply']);
      }else if(this.backAction === 'approved'){
        this.router.navigate(['/pages/larecruit/recruitapproved']);
      }

  }


}
