import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodicsaleService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Query/periodicsale";
    //alert(url);
   // alert(this._comser.getHost() + url);
    return this.http.get(this._comser.getHost() + url);
   // return this.http.get(this._comser.getHost() + url);
  }
}
