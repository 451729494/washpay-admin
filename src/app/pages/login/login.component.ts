import {Component} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';
import {AuthService} from "../../services/auth.service";
import {Keys} from "../../services/models/env";

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,  private router:Router, private authService:AuthService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    //if (this.form.valid) {
      this.authService.login(values['email'],values['password']).subscribe(res =>{

        // login successful if there's a jwt token in the response
        let busiAdminBean = res.data;
        if (busiAdminBean) {

          console.log(res.data);
          //this.auth =
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(Keys.KEY_TOKEN,busiAdminBean.tokenBean.access_token);

          localStorage.setItem(Keys.KEY_USER, JSON.stringify(busiAdminBean.tokenBean));

          //reset headers
          //static HEADERS_AUTH: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});

          //static HEADERS_AUTH_JSON: Headers = new Headers({'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});

          //
          localStorage.setItem('page_menus',JSON.stringify(busiAdminBean.busiMenu.pagesMenu));

          if(busiAdminBean.busiMenu.corpId === null || busiAdminBean.busiMenu.corpId === 'null' ||  busiAdminBean.busiMenu.corpId === ''){
            localStorage.setItem('cur_corp_id','');
            this.router.navigate([ '/pages/dashadmin']);
          }else{
            localStorage.setItem('cur_corp_id',busiAdminBean.busiMenu.corpId);
            this.router.navigate([ '/pages/dashmerch']);
          }


          // return true to indicate successful login
          //return true;
        } else {
          // return false to indicate failed login
          //return false;
        }

      });
    //}
  }
}
