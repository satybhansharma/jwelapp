import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clarity } from '../clarity/clarity';

@Injectable({
  providedIn: 'root'
})
export class ClarityService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Master/ClarityList";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model:any): Observable<any> {
    let url = "/MMI/Master/Add/Clarity";

    return this.http.post(this._comser.getHost()+url,model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/Clarity";
    return this.http.post(this._comser.getHost()+url,model,this._comser.getHeaderOptions())
  }
  Delete(id: any):Observable<any> {
    let url = "/MMI/Master/Clarity/Delete";
    return this.http.post(this._comser.getHost()+url,id,this._comser.getHeaderOptions());
  }    
  ItemsRecord(): Observable<any> {
  
    let url = "/MMI/Master/ItemMasters";
    return this.http.get(this._comser.getHost() + url);
  }
  
}
