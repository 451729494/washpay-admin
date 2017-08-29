import {Component} from '@angular/core';
import { UploadInput } from 'ngx-uploader';

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
})
export class Layouts {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:UploadInput = {
    // url: 'http://website.com/upload',
    type:'uploadAll',
    url: '',
  };

  public fileUploaderOptions:UploadInput = {
    // url: 'http://website.com/upload'
    type:'uploadAll',
    url: '',
  };

  constructor() {
  }

  ngOnInit() {
  }
}
