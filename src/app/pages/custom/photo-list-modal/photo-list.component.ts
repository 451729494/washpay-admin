/**
 * Created by hevan on 2017/5/5.
 */
/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { UserPhotoService } from '../../../services/user/userPhoto.service';
import { Keys } from '../../../services/models/env';
import {PageDataModel} from "../../../services/models/page.model";
import {AuthService} from "../../../services/auth.service";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit{

  rows=[];
  selected=[];

  @Input()
  public entityName = '';
  @Input()
  public entityId = '';


  public pageNav = new PageDataModel();

  public constructor( private userPhotoService:UserPhotoService,private modalService: NgbModal,private authService: AuthService) {

  }
  public ngOnInit():void {

    this.loadDataPhoto();
  }

  public loadDataPhoto(){

    console.log('load data photo');

    let requestParam = new URLSearchParams();
    requestParam.set('userId',this.authService.getUserId());
    requestParam.set('entityName',this.entityName);
    requestParam.set('entityId',this.entityId);
    requestParam.set('page',this.pageNav.page + '');
    requestParam.set('itemsPerPage',this.pageNav.itemsPerPage + '');

    this.userPhotoService.pageQuery(requestParam)
      .subscribe(res =>{
        if(res.successed === '00'){
          this.rows = res.data;
          this.pageNav.totalElements = res.totalElements;
          this.pageNav.totalPages = res.totalPages;
        }else {
          console.log(res.message);
        }
      });

  }

  setPage(event){

  }

  onSelect(event){

  }

}
