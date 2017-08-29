import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { tokenNotExpired,AuthHttp,provideAuth, AuthConfig} from 'angular2-jwt';
import {Response,Headers, Http,URLSearchParams,RequestOptionsArgs} from "@angular/http";

import {Keys} from "./models/env";
import 'rxjs/add/operator/map';
import "rxjs/Rx";

@Injectable()
export class AuthService {
  private auth: any;
  private profile:any;
  private headerAuth: any;
  private headerAuthJSON: any;

  constructor(private http:Http) {
  }

  public getUserEmail = (): string => {
    return this.profile ? this.profile.email : '';
  }

  public getUserPicture = (): string => {
    return this.profile ? this.profile.imageUrl : '';
  }

  public getUserId = (): string => {
    let currentUser = localStorage.getItem(Keys.KEY_USER);
    if(currentUser) {
      let userToken = JSON.parse(currentUser);

       return userToken.user_id;
    }

    return '';
  }

  public getUserName = (): string => {
    if (this.profile) {
      if (this.profile.username) {
        return this.profile.username;
      }

      return this.profile.mobile || this.profile.email;
    }

    return '';
  }

  public login(email, password):Observable<any>{

    let loginRequest = 'username='+email+'&password='+password;

    let headersParam = new Headers({ 'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Basic bGJBZG1pbjoxMjM0NTZsYWJvdXI=', 'Accept': 'application/json'});


    return this.http.post(Keys.SERVER_URL+'/open/user/loginAdmin', loginRequest, { 'headers': headersParam })
        .map(res => res.json());
  }


  public logout = (): void => {

    //登出
    let currentUser = localStorage.getItem(Keys.KEY_USER);
    if(currentUser !== null) {
      let userToken = JSON.parse(currentUser);

      let requestParam = new URLSearchParams();
      requestParam.set('id', userToken.user_id);

      let headersP = new Headers({ 'Authorization': 'Bearer '+userToken.access_token, 'Accept': 'application/json'});


      this.http.post(Keys.SERVER_URL+'/oauth/logout','' ,{search:requestParam, headers:headersP})
        .subscribe((response: Response) => {
          // login successful if there's a jwt token in the response
          //let retData = response.json();
          console.log(response.json());
        });

    }

    //清空缓存
    localStorage.removeItem(Keys.KEY_TOKEN);
    localStorage.removeItem(Keys.KEY_USER);
    localStorage.removeItem(Keys.KEY_USER_INFO);


    this.profile = null;
  }

  public isAuthenticated = (): boolean => {
    return tokenNotExpired(Keys.KEY_TOKEN);
  }

  public isActivated = (): boolean => {
    let currentUser = localStorage.getItem(Keys.KEY_USER);
    if(currentUser !== null) {
      let userToken = JSON.parse(currentUser);
      return userToken.activated;
    }
    return false;
  }

  public getProfile = ():any => {

  if(this.profile) {
    return this.profile;
  }else{

    let sProfile =localStorage.getItem(Keys.KEY_USER_INFO);

    if(sProfile !== null){
      this.profile = JSON.parse(sProfile);
      return this.profile;
    }

     let currentUser = localStorage.getItem(Keys.KEY_USER);
     if(currentUser !== null){
       let userToken = JSON.parse(currentUser);

       let requestParam = new URLSearchParams();
       requestParam.set('id',userToken.user_id);

       let headersP = new Headers({ 'Authorization': 'Bearer '+userToken.access_token, 'Accept': 'application/json'});


       this.http.get(Keys.SERVER_URL+'/secure/user/find', {search:requestParam, headers:headersP})
           .subscribe((response: Response) => {
             // login successful if there's a jwt token in the response
               let retData = response.json();

               if(retData.successed === '00'){
                 localStorage.setItem('profile', JSON.stringify(retData.data));
                 this.profile = retData.data;

                 return this.profile;
               }else {
                 return null;
               }
           });
     }
  }
  }

  public getCorpId = (): any => {

    let curCorpStorage =localStorage.getItem('cur_corp_id');

    return curCorpStorage;

    /*

    let curCorpStorage =localStorage.getItem('corp');

    if(curCorpStorage !== null ){
      let  curCorp = JSON.parse(curCorpStorage);
      return curCorp.corpId;
    }else{
      let currentUser = localStorage.getItem("cur_user");
      if(currentUser !== null){
        let userToken = JSON.parse(currentUser);

        let requestParam = new URLSearchParams();
        requestParam.set('userId',userToken.user_id);

        console.log(userToken.user_id);

        this.http.get(Keys.SERVER_URL+'/corpUser/findCorpByUser', {search:requestParam, headers:Keys.HEADERS}).subscribe((res: Response) => {
          // login successful if there's a jwt token in the response
          let retData = res.json();

          console.log(retData);

          if(retData.successed === '00'){
            if(retData.data){
              localStorage.setItem('corp', JSON.stringify(retData.data));

              return retData.data.corpId;

            }else{
              return 0;
            }

          }else {
            return 0;
          }
        });

      }else{
        return 0;
      }
    }*/
  }

  public getHeadersAuth(){

    return new Headers({'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});
  }

  public setHeadersAuth(data){
    this.headerAuth = data;
  }

  public getHeadersAuthJSON(){

   // if(this.headerAuthJSON){
   //   return this.headerAuthJSON;
   // }else {
    //  this.headerAuthJSON =  new Headers({'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});

      return new Headers({'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});
    //}
  }

  public setHeadersAuthJSON(data){
    this.headerAuthJSON = data;
  }

  public getPageMenu = (): any =>{
     let curPageMenus =localStorage.getItem('page_menus');

     let pageMenus = JSON.parse(curPageMenus);

     return pageMenus;
  }
}
