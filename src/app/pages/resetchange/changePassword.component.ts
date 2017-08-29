import {Component} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!../reset/reset.scss';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'changepassword',
  templateUrl: './changePassword.html',
})
export class ChangePassword {

  public form:FormGroup;
  public oldpassword:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public isError:boolean =false;
  public message:string = "";

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private route:ActivatedRoute, private router:Router,private userService:UserService, private authService:AuthService) {

    this.form = fb.group({
      'oldpassword':['', Validators.compose([Validators.required])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.oldpassword = this.form.controls['oldpassword'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }


  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      //console.log(values);

      let requestParam = new URLSearchParams();
      requestParam.set('userId', this.authService.getUserId());
      requestParam.set('oldpassword',  values['oldpassword']);
      requestParam.set('password',  values['passwords']['password']);

      this.userService.changePassword(requestParam).subscribe(res =>{
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


}
