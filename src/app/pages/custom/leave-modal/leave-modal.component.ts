import { Component, EventEmitter} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {Keys} from "../../../services/models/env";
import {AuthService} from "../../../services/auth.service";

import { NgbModal,NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'leave-apply-modal',
  styleUrls: [('./leave-modal.component.scss')],
  templateUrl: './leave-modal.component.html'
})
export class LeaveApplyComponent {

  modalHeader: string;


  public applyForm:FormGroup;

  public leavedReason:AbstractControl;//
  public leavedDate:NgbDateStruct;



  constructor(fb:FormBuilder, private activeModal: NgbActiveModal, private authService:AuthService) {

    this.applyForm = fb.group({
      'leavedReason': ['',Validators.compose([Validators.required])],

    });

    this.leavedReason = this.applyForm.controls['leavedReason'];
  }


  toSave(values:Object){



    this.activeModal.close( '');

  }


  closeModal(){

  }
}
