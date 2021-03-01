import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ItemMast } from '../models/item-mast';
import {retry,catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {

  mydomain: string = "";
  myUrl: string = "";
  constructor(private http:HttpClient) {
    this.mydomain = "http://localhost:55215";
  }
  httpOptions = {
    headers:new HttpHeaders ({
      'content-Type': 'application/json;charset=utf-8'
    })
  };

  getItems(): Observable<ItemMast[]> {
    this.myUrl = "/MMI/Master/ItemMasters";
    return this.http.get<ItemMast[]>(this.mydomain + this.myUrl).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getItemName(model:any): Observable<any> {
    this.myUrl = "/MMI/Master/ItemMaster/GetItemName";
    return this.http.post<any>(this.mydomain+this.myUrl,model,this.httpOptions);
  };
  errorHandler(error) {
    let errorMessage = '/MMI/Master/ItemMaster/GetItemName';
    if (error.error instanceof ErrorEvent) {
      //Get Client Side Error
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code ${error.status} \n Message :${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
