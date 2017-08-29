import {Component} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!./register.scss';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form:FormGroup;
  public username:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public isError:boolean =false;
  public message:string = "";

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private route:ActivatedRoute, private router:Router,private userService:UserService, private authService:AuthService) {

    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.username = this.form.controls['username'];
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
      let params = {'username':values['username'],'email':values['email'],'password':values['passwords']['password']};

      this.userService.register(params).subscribe(res =>{
        if(res.successed === '00'){

          //let isLogin = this.authService.login(values['username'],values['passwords']['password']);

          //if(isLogin){
            this.router.navigate(['/verify'],{ queryParams:{ 'username' : values['username'] }});
          //}
         } else {
          this.isError = true;
          this.message = res.message;
          console.log(res.message);
        }
      });
    }
  }

}
