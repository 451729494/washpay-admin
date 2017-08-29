/**
 * Created by hevan on 2017/5/5.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoModalComponent} from "./photo-modal.component";
import { NgUploaderModule } from 'ngx-uploader';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule,
    FormsModule, NgUploaderModule],
  declarations: [PhotoModalComponent],
  exports: [PhotoModalComponent]
})
export class PhotoModalModule {
}
