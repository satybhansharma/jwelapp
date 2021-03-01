import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertType } from '../../shared/_alert';

@Injectable({
  providedIn: 'root'
})

//const headers = new HttpHeaders().set('content-type', 'application/json');  
export class ItemService {

  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any> {
    let url = "/MMI/Master/ItemMasters";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model: any): Observable<any> {
    let url = "/MMI/Master/ItemMaster/Add";
   // alert("im in Add Model");

    return this.http.post(this._comser.getHost() + url, model)
  }
  Update(model: any): Observable<any> {
    
    let url = "/MMI/Master/ItemMaster/Update";
    return this.http.post(this._comser.getHost() + url, model)
  }
  Delete(model: any): Observable<any> {

    let url = "/MMI/Master/ItemMaster/Delete";
    return this.http.post(this._comser.getHost() + url,model);
  }
}
