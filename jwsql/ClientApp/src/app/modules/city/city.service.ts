import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any> {    
    let url = "/MMI/Master/cityList";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model: any): Observable<any> {
    let url = "/MMI/Master/Add/City";

    return this.http.post(this._comser.getHost() + url, model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/city";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions())
  }
  Delete(model: any): Observable<any> {
    let url = "/MMI/Master/city/Delete";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions())
  }
 
  
  
  GetState(): Observable<any> {
    let url = "/MMI/Master/State";      
    return this.http.get(this._comser.getHost() + url);
  }
  
}
