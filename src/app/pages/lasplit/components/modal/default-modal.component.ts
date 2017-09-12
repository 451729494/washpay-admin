import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import {SplitbillService} from "../../../../services/splitbill/splitbill.service";
import {SplitBranchQuery} from "../splitbranch.component";

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {


  public msg:string;
  public rate:string;
  public message:string;

  modalHeader: string;
  // modalContent: string = ``;

  constructor(fb:FormBuilder, private activeModal: NgbActiveModal,private  splitBranchQuery:SplitBranchQuery,private splitbillService:SplitbillService) {

  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  update(){

    console.log(this.msg+''+"====="+this.rate+'');
    let requestParam = new URLSearchParams();
    requestParam.set('id',this.msg+'');
    requestParam.set('rate',this.rate+'');

    this.splitbillService.updateRateById(requestParam)
      .subscribe(res => {
        if (res.successed === '00') {
          // this.router.navigate(['/pages/lasplit/splitbranch'], {queryParams: {paramId: this.msg}});
          this.closeModal();
        } else {
          console.log(res.message);
          this.message = res.message;
        }
      });

  }

}
