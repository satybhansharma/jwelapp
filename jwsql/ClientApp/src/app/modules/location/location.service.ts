import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Master/Location/All";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model:any): Observable<any> {
    let url = "/MMI/Master/Location/Add";

    return this.http.post(this._comser.getHost()+url,model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Location/Edit";
    return this.http.post(this._comser.getHost()+url,model,this._comser.getHeaderOptions())
  }
  Delete(id: any):Observable<any> {
    let url = "/MMI/Master/Location/Delete";
    return this.http.post(this._comser.getHost()+url,id,this._comser.getHeaderOptions());
  }    
}
