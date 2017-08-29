/**
 * Created by hevan on 2016/12/20.
 */

import {Component,OnInit,Input} from '@angular/core';

import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";
import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../../services/models/env';
import {BlogService} from "../../../../services/blog/blog.service";
import {PageDataModel} from "../../../../services/models/page.model";
import {CategoryService} from "../../../../services/blog/category.service";
import {AuthService} from "../../../../services/auth.service";


@Component({
  selector: 'la-blog-query',
  templateUrl:'./blog.html'
})
export class BlogQuery implements OnInit {

  public rows:Array<any> = [];

  public pageNav = new PageDataModel();

  selected=[];

  public searchForm:FormGroup;
  public name:AbstractControl;
  public category:AbstractControl;
  public status:AbstractControl;
  public statusHot:AbstractControl;


  public categoryList:Array<any>;


  public constructor(fb:FormBuilder, private router:Router,private route:ActivatedRoute, private blogService:BlogService,private categoryService:CategoryService,private authService:AuthService,private _dateParser:NgbDateParserFormatter) {

    this.searchForm = fb.group({
      'name': [''],
      'category': [''],
      'status': [''],
      'statusHot': [''],
    });


    this.name = this.searchForm.controls['name'];
    this.category = this.searchForm.controls['category'];
    this.status = this.searchForm.controls['status'];
    this.statusHot = this.searchForm.controls['statusHot'];

    //初始化条件
    this.status.setValue('0');

  }

  public ngOnInit():void {

    this.categoryService.findAll().subscribe(res =>{
      if(res.successed === '00'){
        this.categoryList = res.data;
      }else {
        console.log(res.message);
      }
    });

    this.loadData();
  }

  public loadData() {
    let requestParam = new URLSearchParams();
    requestParam.set('name', this.name.value);
    requestParam.set('blogCategory.id', this.category.value);
    requestParam.set('status', this.status.value);
    requestParam.set('statusHot', this.statusHot.value);
    requestParam.set('checkUser.approved', '0');

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');

    this.blogService.pageQuery(requestParam)
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

  public onSubmit(values:Object) {

    let requestParam = new URLSearchParams();
    requestParam.set('name', values['name']);
    requestParam.set('blogCategory.id',  values['category']);
    requestParam.set('status', values['status']);
    requestParam.set('statusHot', values['statusHot']);
    requestParam.set('checkUser.approved', '0');

    requestParam.set('page', this.pageNav.page + '');
    requestParam.set('itemsPerPage', this.pageNav.itemsPerPage + '');
    console.log(requestParam.toString());

    this.blogService.pageQuery(requestParam)
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

  public toDelete(curId) {

      let requestParam = new URLSearchParams();
      requestParam.set('id', curId);
      this.blogService.delete(requestParam)
        .subscribe(res => {
          if (res.successed === '00') {
            this.loadData();
          } else {
            alert(res.message);
          }
        });

  }



  public toAdd() {

    this.router.navigate(['/pages/lablog/blogedit'], {
      queryParams: {
        paramId: ''
      }
    });
  }


  public toApply(curId) {
    var data = [];
    if(curId){
       data = [curId];
    }else if(this.selected.length > 0){

      for(let m =0 ;m < this.selected.length;m++){
        let item = this.selected[m];
        data.push(item.id);
      }
    }

    let params = {
      ids:data,
      userId:this.authService.getUserId()
    }

    this.blogService.toApplyApprove(JSON.stringify(params))
      .subscribe(res => {
        if (res.successed === '00') {
          this.loadData();
        }

        if(res.error){
          alert(res.message);
        }
      });

  }


  public toEdit(curId) {
    if (curId) {
      this.router.navigate(['/pages/lablog/blogedit'], {
        queryParams: {
          paramId: curId
        }
      });
    }
  }

  public toView(curId) {
    if (curId) {
      this.router.navigate(['/pages/lablog/blogview'], {
        queryParams: {
          paramId: curId,
          backAction: 'query'
        }
      });
    }
  }


  setPage(event){

  }

  onSelect(event){
    console.log(event);
  }

}

