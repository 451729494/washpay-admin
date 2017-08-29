/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { Keys,Utils} from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {UserService} from "../../../services/user.service";
import {UserInfoService} from "../../../services/user/userInfo.service";
import {UserAccountService} from "../../../services/finance/userAccount.service";
import {UserResumeService} from "../../../services/user/userResume.service";
import {UserResumeTrackService} from "../../../services/user/userResumeTrack.service";

@Component({
  selector: 'la-user-resume-modal',
  templateUrl:'./userresume-modal.html'
})
export class UserResumeComponent implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  @Input()
  public userId = '';

  public userResume:any;



  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute,  private userService:UserService, private userResumeService:UserResumeService,private userResumeTrackService:UserResumeTrackService ) {

  }

  public ngOnInit():void {

    this.loadData();
  }

  public loadData() {

    let params = new URLSearchParams();
    params.set('userId', this.userId);

    console.log(params.toString());

    this.userResumeService.find(params)
      .subscribe(res => {
        if (res.successed === '00') {
         this.userResume = res.data;
        } else {
          console.log(res.message);
        }
      });

    //search user resume track
    let paramsQuery = new URLSearchParams();
    paramsQuery.set('userId', this.userId);

    paramsQuery.set('page', this.pageNav.page + '');
    paramsQuery.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.userResumeTrackService.pageQuery(params)
      .subscribe(res => {
        if (res.successed === '00') {
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        } else {
          console.log(res.message);
        }
      });

  }

  setPage(event){

  }

}

