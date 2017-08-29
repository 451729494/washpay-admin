import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  public canActivate() {
    let isAuth = this.auth.isAuthenticated();

    if (isAuth !== true) {
      this.router.navigate(['/login']);
      return isAuth;
    }


    //let isActived = this.auth.isActivated();

    //if(isActived !== true){
    //  this.router.navigate(['/verify']);
    //  return isActived;
    //}

   // let corpId = this.auth.getCorpId();

   // console.log(corpId);
   // if(corpId !== null && corpId <1 ){
    //  this.router.navigate(['/pagecorp/corpview']);
    //  return false;
   // }

    return isAuth;
  }
}
