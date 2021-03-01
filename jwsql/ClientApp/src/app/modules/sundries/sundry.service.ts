import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SundryService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Master/sundryList";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model:any): Observable<any> {
    let url = "/MMI/Master/Add/sundry";

    return this.http.post(this._comser.getHost()+url,model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/Sundry";
    return this.http.post(this._comser.getHost()+url,model,this._comser.getHeaderOptions())
  }
  Delete(id: any):Observable<any> {
    let url = "/MMI/Master/Sundry/Delete";
    return this.http.post(this._comser.getHost()+url,id,this._comser.getHeaderOptions());
  }    
  
}
