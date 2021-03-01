import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBALVAR } from '../../modules/sale/global-var';
import { LocalStorageService } from './local-storage.service';
import * as moment from 'moment';
import { DatabaseQueryService } from './database-query.service';
import { isStringTextContainingNode } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl: string;
 

  constructor(private _http:HttpClient) {

  }
     


  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  onlyDecimalNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }


  KeyPressNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  getHost(): string {
  //  return "https://localhost:44335";
   // return "https://192.168.1.238/mmijewel/"
   // return "https://192.168.1.238";
  // return "https://api.jeweldeck.in";
   return "http://localhost:5800";
  }

  getHeaderOptions(): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return httpOptions;
  }

  login(model: any): Observable<any> {
    let Url = "/MMI/Account/Login";
   return this._http.post(this.getHost() + Url, model);
  }

  getCfgTmpRecords():Observable<any> {
    let url = "/MMI/GetcfgtmpRecord";
    return this._http.get(this.getHost()+url);
  }

  getVersionTmpRecords(): Observable<any> {
    let url = "/MMI/DecryptVersionRecord";
    return this._http.get(this.getHost()+url);
  }

  public Today_Date(date:any=new Date()):any {
    let todayDate: moment.Moment = moment(date);
    return todayDate.format("DD-MM-YYYY");
  }

  public Calc_List_Sum(Records: Array<any>, key): any {
    let sum = 0.0;
    try {
    
      Records.forEach(function (item, index) {
        sum += item[key];
      })
    } catch (e) {

    }
    
    return sum;
  }
 

 
  
  

  
}
