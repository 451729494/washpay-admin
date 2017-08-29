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

import {PhotoModalComponent} from "../../../custom/photo-modal/photo-modal.component";
import {AuthService} from "../../../../services/auth.service";
import {BusiTypeService} from "../../../../services/recruit/busiType.service";
import {MsgPushService} from "../../../../services/msg/msgPush.service";

@Component({
  selector: 'la-msg-push-edit',
  templateUrl:'./msgPushEdit.html'
})
export class MsgPushEdit {

  public rows:Array<any> [];

  public curId:string = '';

  //
  public editForm:FormGroup;

  public name:AbstractControl;
  public pushType:AbstractControl;
  public pushObject:AbstractControl;
  public description:AbstractControl;
  public pushChannel1:AbstractControl;
  public pushChannel2:AbstractControl;
  public pushChannel3:AbstractControl;


  public corpTypeList:Array<any>;

  public pushDate;
  hourStep = 9;
  minuteStep = 15;
  secondStep = 30;


  public ckeditorContent:string = '<p>Hello CKEditor</p>';


  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private userPhotoService:UserPhotoService, private busiTypeService:BusiTypeService, private msgPushService:MsgPushService,private modalService: NgbModal, private authService:AuthService) {

    this.editForm = fb.group({
      'pushType':['',Validators.compose([Validators.required])],
      'name': ['',Validators.compose([Validators.required])],


      'description':['',Validators.compose([Validators.required])],
      'pushObject': ['',],
      'pushChannel1': ['',],
      'pushChannel2': ['',],
      'pushChannel3': ['',],
    });

    this.pushType = this.editForm.controls['pushType'];
    this.name = this.editForm.controls['name'];


    this.description = this.editForm.controls['description'];
    this.pushObject = this.editForm.controls['pushObject'];
    this.pushChannel1 = this.editForm.controls['pushChannel1'];
    this.pushChannel2 = this.editForm.controls['pushChannel2'];
    this.pushChannel3 = this.editForm.controls['pushChannel3'];


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];



    if(this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.msgPushService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {

            this.name.setValue(res.data.name);


            this.pushType.setValue(res.data.pushType);
            this.description.setValue(res.data.description);
            this.pushObject.setValue(res.data.pushObject);

            this.pushChannel1.setValue(res.data.pushChannel1);
            this.pushChannel2.setValue(res.data.address.pushChannel2);
            this.pushChannel3.setValue(res.data.address.pushChannel3);


            if(res.data.pushTime){
              this.pushDate = Utils.toDateStruct(res.data.pushTime);
              this.hourStep = Utils.getHour(res.data.pushTime);
              this.minuteStep = Utils.getMinutes(res.data.pushTime);
              this.secondStep = Utils.getSS(res.data.pushTime);
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

  public toSave(values:Object){

    if(this.editForm.valid){

      let body = {
        'id': this.curId,
        'name': values['name'],
        'pushType': values['pushType'],


        'description': values['description'],
        'pushObject': values['pushObject'],
        'pushChannel1': values['pushChannel1'],
        'pushChannel2': values['pushChannel2'],
        'pushChannel3': values['pushChannel3'],

        'pushTime':this.pushDate.year +'-'+ Utils.formatTwo(this.pushDate.month) +'-'+ Utils.formatTwo(this.pushDate.day) + ' ' + Utils.formatTwo(this.hourStep) + ':' + Utils.formatTwo(this.minuteStep) + ':' + Utils.formatTwo(this.secondStep),

        'checkUser':{'createdUserId':this.authService.getUserId(),'updatedUserId':this.authService.getUserId()}
      };

      this.msgPushService.save(JSON.stringify(body)).subscribe(res=> {
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

      this.router.navigate(['/pages/lamsg/msgpush']);

  }


}
