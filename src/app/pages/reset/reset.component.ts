import {Component} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!./reset.scss';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'reset',
  templateUrl: './reset.html',
})
export class Reset {

  public form:FormGroup;
  public email:AbstractControl;
  public veryCode:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public isError:boolean =false;
  public message:string = "";

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private route:ActivatedRoute, private router:Router,private userService:UserService, private authService:AuthService) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'veryCode':['', Validators.compose([Validators.required])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.veryCode = this.form.controls['veryCode'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      console.log(values);
      // let params = 'username='+values['email']+'&veryCode='+values['veryCode']+'&password='+values['passwords']['password'];

      let requestParam = new URLSearchParams();

      requestParam.set('username', this.email.value);
      requestParam.set('veryCode', this.veryCode.value);
      requestParam.set('password', this.repeatPassword.value);


      this.userService.resetPassword(requestParam).subscribe(res =>{
        if(res.successed === '00'){

          this.authService.logout();

          this.router.navigate(['/login']);

         } else {
          this.isError = true;
          this.message = res.message;
          console.log(res.message);
        }
      });
    }
  }

  sendVeryCode(values:Object){

    let curEmail = values['email'];
    console.log(curEmail);
    if(curEmail){
      let params = 'email='+curEmail;

      this.userService.sendEmailVeryCode(params).subscribe(res =>{
        if(res.successed === '00'){

           this.message = '验证码已发送';
        } else {
          this.isError = true;
          this.message = res.message;
          console.log(res.message);
        }
      });
    }

  }

}
