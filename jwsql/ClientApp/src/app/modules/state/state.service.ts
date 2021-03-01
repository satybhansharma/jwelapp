import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertType } from '../../shared/_alert';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Master/State";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model:any): Observable<any> {
    let url = "/MMI/Master/Add/State";
    return this.http.post(this._comser.getHost()+url,model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/State";
    return this.http.post(this._comser.getHost()+url,model,this._comser.getHeaderOptions())
  }
  Delete(id: any):Observable<any> {
    let url = "/MMI/Master/State/Delete";
    return this.http.post(this._comser.getHost()+url,id,this._comser.getHeaderOptions());
  }    
}
