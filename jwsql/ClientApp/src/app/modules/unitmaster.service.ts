import { Injectable } from '@angular/core';
import { CommonService } from '../../app/shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Unitmaster } from '../modules/unitmaster';
@Injectable({
  providedIn: 'root'
})
export class UnitmasterService {

  constructor(private _comser: CommonService,private http: HttpClient) { }
  Records(): Observable<any>{
    let url = "/MMI/Master/Units";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model:any): Observable<any> {
    let url = "/MMI/Master/Add/Unit";

    return this.http.post(this._comser.getHost()+url,model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Update/Unit";
    return this.http.post(this._comser.getHost()+url,model,this._comser.getHeaderOptions())
  }
  Delete(id: any):Observable<any> {
    let url = "/MMI/Master/Unit/Delete";
    return this.http.post(this._comser.getHost()+url,id,this._comser.getHeaderOptions());
  }    
  
}
