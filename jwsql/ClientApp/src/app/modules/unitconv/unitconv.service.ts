import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitconvService {

  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any> {
    let url = "/MMI/Master/UnitConversions";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model: any): Observable<any> {
    let url = "/MMI/Master/CreateUnitConversion";

    return this.http.post(this._comser.getHost() + url, model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/UpdateUnitConversion";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions())
  }
  Delete(model: any): Observable<any> {
    let url = "/MMI/Master/DeleteUnitConversion";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions());
  }
}
