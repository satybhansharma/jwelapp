import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseregdetService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(fdate: string,tdate:string): Observable<any>{
    let url = "/MMI/Query/regdet";
    //alert(url);
    //alert(this._comser.getHost() + url);
    //return this.http.get(this._comser.getHost() + url);
    return this.http.post(this._comser.getHost()+url,{fdate:fdate,tdate:tdate})
  }
}
