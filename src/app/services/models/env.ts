import {Headers} from '@angular/http';

import * as moment from 'moment';

export class Utils {

  public static toDateStruct(dateStr:string):any{
    let dateStrunct =  {
      "year": + dateStr.substring(0,4),
      "month": +dateStr.substring(5,7),
      "day": +dateStr.substring(8,10)
    };

    return dateStrunct;
  }

  public static getHour(dateStr:string):any{
    return  dateStr.substring(11,13);

  }

  public static getMinutes(dateStr:string):any{
    return  dateStr.substring(14,16);

  }

  public static getSS(dateStr:string):any{
    return  dateStr.substring(18,20);

  }

  public static toMonth(month:string):any{
    let dateStrunct =  {
      "year": + month.substring(0,4),
      "month": +month.substring(5,7),
    };

    return dateStrunct;
  }

public static dateStructToString(dateStruct) {

  if(dateStruct){
    return  dateStruct.year +'-'+ this.formatTwo(dateStruct.month) +'-'+ this.formatTwo(dateStruct.day);
  }else {
    return '';
  }

}

  public static formatTwo(data:number):any{

    if(data < 10){
      return '0'+data;
    }else {
      return data+'';
    }
  }

  public static toTimeStruct(dateStr):any{
    let dateStrunct =  {
      "hour": +moment(dateStr).format("HH"),
      "minute": +moment(dateStr).format("mm")
    };

    return dateStrunct;
  }

  public static zerosize(value, length){
    if (!length) length = 2;

    value = String(value);

    for (var i = 0, zeros = ''; i < (length - value.length); i++) {

      zeros += '0';

    }

    return zeros + value;

  }
}

export class Keys {
  static KEY_TOKEN: string = "labour_token";
  static KEY_USER_INFO: string = "labour_user_info";
  static KEY_USER: string = "labour_user";

  static SERVER_URL:string = 'http://120.77.146.48/labour';

  //static SERVER_UPLOAD_URL: string = 'http://139.129.202.208:8080/ysext-server';
  static SERVER_UPLOAD_URL: string = 'http://120.77.146.48/labour';

  static HEADERS: Headers = new Headers({'Content-Type': 'application/json'});

  static HEADERS_AUTH: Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});

  static HEADERS_AUTH_JSON: Headers = new Headers({'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(Keys.KEY_TOKEN)});

  static HEADERS_UN_FORM:Headers = new Headers({'Application': 'application/x-www-form-urlencoded'});

  public static setHeadersAuth(any){
     this.HEADERS_AUTH = any;
  }

  public static setHeadersAuthJson(any){
    this.HEADERS_AUTH_JSON = any;
  }

}
