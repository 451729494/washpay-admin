import { NgModule,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule,NgbDatepickerModule,NgbTimepickerModule,NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgUploaderModule } from 'ngx-uploader';
import { CKEditorModule } from 'ng2-ckeditor';

import { routing }       from './lablog.routing';
import {LaBlog} from "./lablog.component";
import {BlogQuery} from "./components/blog/blog.component";
import {BlogEdit} from "./components/blog/blogEdit.component";
import {CategoryQuery} from "./components/category/category.component";
import {CategoryEdit} from "./components/category/categoryEdit.component";
import {PhotoListModule} from "../custom/photo-list-modal/photo-list.module";
import {PhotoModalModule} from "../custom/photo-modal/photo-modal.module";
import {EntityListModule} from "../custom/entity-list-modal/entity-list.module";
import {EntityListComponent} from "../custom/entity-list-modal/entity-list.component";
import {PhotoModalComponent} from "../custom/photo-modal/photo-modal.component";
import {InvoiceApproveFlowComponent} from "../custom/invoice-approve-flow/invoice-approve-flow.component";
import {BlogView} from "./components/blog/blogView.component";
import {BlogApply} from "./components/blog/blogApply.component";
import {BlogApproved} from "./components/blog/blogApproved.component";
import {InvoiceApproveFlowModule} from "../custom/invoice-approve-flow/invoice-approve-flow.module";
import {PhotoListComponent} from "../custom/photo-list-modal/photo-list.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFormsModule,
    AppTranslationModule,
    NgaModule,
    NgbRatingModule,
    NgbTabsetModule.forRoot(),
    NgUploaderModule,
    NgbDatepickerModule,
    CKEditorModule,
    NgxDatatableModule,
    NgxDatatableModule,
    PhotoListModule,
    PhotoModalModule,
    EntityListModule,
    InvoiceApproveFlowModule,
    routing
  ],
  declarations: [
    LaBlog,
    BlogQuery,
    BlogEdit,
    CategoryQuery,
    CategoryEdit,
    BlogView,
    BlogApply,
    BlogApproved
  ],entryComponents:[PhotoModalComponent,EntityListComponent, PhotoListComponent, InvoiceApproveFlowComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaBlogModule {
}

