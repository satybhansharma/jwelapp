import { Injectable } from '@angular/core';import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AccmastService {

  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any> {    
    let url = "/MMI/AccMastRecords";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model: any): Observable<any> {
    let url = "/MMI/Master/Add/accmast";

    return this.http.post(this._comser.getHost() + url, model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/accmast";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions())
  }
  Delete(id: number): Observable<any> {
    let url = "/MMI/Master/accmast/Delete/"+id;    
    return this.http.post(this._comser.getHost() + url, id, this._comser.getHeaderOptions());
  }
 
  AcRecords(): Observable<any>{
    let url = "/MMI/Master/acgroupList";
    return this.http.get(this._comser.getHost() + url);
  }
  GetOpbal(id: number): Observable<any> {
    let url = "/MMI/AccMast/GetOpBal/"+id;      
    return this.http.get(this._comser.getHost() + url);
  }
  GetCity(): Observable<any> {
    let url = "/MMI/Master/cityList";      
    return this.http.get(this._comser.getHost() + url);
  }
  Getlocation(): Observable<any> {
    let url = "/MMI/Master/Location/All";      
    return this.http.get(this._comser.getHost() + url);
  }
  GetSeries(): Observable<any> {
    let url = "/MMI/SeriesMastRecords";      
    return this.http.get(this._comser.getHost() + url);
  }
  GetMcurr(): Observable<any> {
    let url = "/MMI/McurrRecords";      
    return this.http.get(this._comser.getHost() + url);
  }
}
