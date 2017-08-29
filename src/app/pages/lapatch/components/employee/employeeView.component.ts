/**
 * Created by hevan on 2017/2/26.
 */
import {Component,Input,OnInit,ChangeDetectionStrategy} from '@angular/core';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import { PageDataModel } from '../../../../services/models/page.model';
import { Keys,Utils} from '../../../../services/models/env';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from "../../../../services/auth.service";
import {CorpEmployeeService} from "../../../../services/corp/corpEmployee.service";

@Component({
  selector: 'la-patch-employee-view',
  templateUrl:'./employeeView.html'
})
export class PatchEmployeeView {


  public curId:string = '';
  public employee:any;
  public backAction = '';

  public constructor(fb:FormBuilder, private route:ActivatedRoute, private router:Router, private corpEmployeeService:CorpEmployeeService,private authService:AuthService) {


    //直接获取参数
    this.curId = this.route.snapshot.queryParams["paramId"];

     this.backAction = this.route.snapshot.queryParams["backAction"];
  }

  public ngOnInit():void {

    if (this.curId) {
      let params = new URLSearchParams();
      params.set('id', this.curId + '');

      this.corpEmployeeService.find(params).subscribe(res => {
        if (res.successed === '00') {
          if (res.data) {
            this.employee = res.data;
          }
        }

      });

    }
  }

  public toBack() {

    this.router.navigate(['/pages/lapatch/patchemployeequery']);

  }



}
