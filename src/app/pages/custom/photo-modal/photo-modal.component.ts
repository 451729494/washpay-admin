import { Component, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {Keys} from "../../../services/models/env";
import {AuthService} from "../../../services/auth.service";


interface FormData {
  concurrency: number;
  autoUpload: boolean;
  verbose: boolean;
}

@Component({
  selector: 'photo-modal',
  styleUrls: [('./photo-modal.component.scss')],
  templateUrl: './photo-modal.component.html'
})
export class PhotoModalComponent {

  modalHeader: string;

  public userId:string;
  public entityName:string;
  public entityId:string = '';

  public imageUrl:string;


  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;


  constructor(private activeModal: NgbActiveModal, private authService:AuthService) {
    this.formData = {
      concurrency: 0,
      autoUpload: false,
      verbose: false
    };

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }


  closeModal(){

    console.log('close result' + this.imageUrl);

    this.activeModal.close( this.imageUrl);
    //return this.imageUrl;
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
      //const index = this.files.findIndex(file => file.id === output.file.id);
      //this.files[index] = output.file;

    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    }else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }else if (output.type === 'done') {


      let retData = output.file.response;

      console.log( output.file.response);
      console.log(output.file.response.data);
      if(retData.successed == '00'){
        if(retData.data){
          this.imageUrl = retData.data.imageUrl;
        }
      }
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: Keys.SERVER_UPLOAD_URL + '/open/file/upload',
      method: 'POST',
      data: { userId: this.authService.getUserId(),entityName:this.entityName,entityId:this.entityId},
      concurrency: 1
    };

    this.uploadInput.emit(event);
  }


  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
}
