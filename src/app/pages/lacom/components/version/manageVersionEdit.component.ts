/**
 * Created by hevan on 2017/7/3.
 */

import {Component,OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Keys } from '../../../../services/models/env';
import { UserService } from '../../../../services/user.service';
import {AuthorityService} from "../../../../services/check/authority.service";
import {ModuleService} from "../../../../services/check/module.service";
import {ManageVersionService} from "../../../../services/third/manageVersion.service";
import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";


@Component({
  selector: 'la-manage-version-edit',
  templateUrl: './manageVersionEdit.html'
})
export class ManageVersionEdit implements OnInit{

  public curId = '';
  public msg = '';

  public editForm:FormGroup;
  public name:AbstractControl;
  public versionType:AbstractControl;
  public versionNo:AbstractControl;
  public appUrl:AbstractControl;
  public status:AbstractControl;


  public isError:boolean =false;

  public moduleList:Array<any> = [];

  loading = false;

  public constructor(fb:FormBuilder,private acRoute:ActivatedRoute,private router: Router,private manageVersionService:ManageVersionService,private modalService: NgbModal) {

    this.editForm = fb.group({
      'name': ['',Validators.compose([Validators.required])],
      'versionNo': ['',Validators.compose([Validators.required])],
      'versionType': ['',Validators.compose([Validators.required])],
      'appUrl': ['',],
      'status': ['',],
    });

    this.name = this.editForm.controls['name'];
    this.versionNo = this.editForm.controls['versionNo'];
    this.appUrl = this.editForm.controls['appUrl'];
    this.versionType = this.editForm.controls['versionType'];
    this.status = this.editForm.controls['status'];


    //直接获取参数
    this.curId = this.acRoute.snapshot.queryParams["paramId"];


  }

  public ngOnInit():void {

    this.loadData();
  }

  public onChange(value):any {
    console.log(value);
  }

  public toBack():any {
    this.router.navigate(['/pages/lacom/manageversion']);
  }


  public loadData(){

    if(this.curId){
      let requestParam = new URLSearchParams();
      requestParam.set('id',this.curId);

      this.manageVersionService.find(requestParam)
        .subscribe(res =>{
          if(res.successed === '00'){
            this.name.setValue(res.data.name);
            this.versionNo.setValue(res.data.versionNo);
            this.appUrl.setValue(res.data.appUrl);
            this.status.setValue(res.data.status);
            this.versionType.setValue(res.data.versionType);

          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public onSubmit(values:Object){

    if(this.editForm.valid){

      let requestParam = {'id': this.curId,
        'name': values['name'],
        'versionNo': values['versionNo'],
        'versionType': values['versionType'],
        'appUrl':values['appUrl'],
        'status':values['status']
      };

      this.manageVersionService.save(JSON.stringify(requestParam))
        .subscribe(res =>{
          if(res.successed === '00'){
            this.toBack();
          }else {
            this.msg = res.message;
          }
        });
    }
  }

  public photoMainShow(){
    const mainModal = this.modalService.open(PhotoModalComponent, {size: 'lg'});
    mainModal.componentInstance.modalHeader = '主图片';
    mainModal.componentInstance.entityId = this.curId;
    mainModal.componentInstance.entityName = 'manageVersion';
    mainModal.result.then((result) => {

      console.log('result' +result);
      if(result){
        this.appUrl.setValue(result);
      }

    });
  }

}

