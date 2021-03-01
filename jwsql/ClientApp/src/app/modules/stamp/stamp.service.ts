import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class StampService {
  constructor(private _comser: CommonService, private http: HttpClient) { }
  Records(): Observable<any> {    
    let url = "/MMI/Master/Stamps";
    return this.http.get(this._comser.getHost() + url);
  }
  Create(model: any): Observable<any> {
    let url = "/MMI/Master/Stamps/Add";

    return this.http.post(this._comser.getHost() + url, model)
  }
  Update(model: any): Observable<any> {
    let url = "/MMI/Master/Stamps/Update";
    return this.http.post(this._comser.getHost() + url, model, this._comser.getHeaderOptions())
  }
  Delete(id: number): Observable<any> {
    let url = "/MMI/Master/Stamps/Delete/"+id;    
    return this.http.post(this._comser.getHost() + url, id, this._comser.getHeaderOptions());
  }
  ItemsRecord(): Observable<any> {    
    let url = "/MMI/Master/ItemMasters";
    return this.http.get(this._comser.getHost() + url);
  }
}

