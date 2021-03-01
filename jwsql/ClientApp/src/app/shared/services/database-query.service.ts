import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PinnedRowModel } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseQueryService {

  constructor(private _http: HttpClient,
    private _cs:CommonService) { }

  //Asynchronous Service
  public execute(query: any): Observable<any> {
    let url = "/MMI/Database/Query";
    let data = {
      "type": 0,
      "statement": query
    };

    return this._http.post(this._cs.getHost() + url, data);

  }
  //Synchronous Service
  public execute_Sync(query: any) {
    let url = "/MMI/Database/Query";
    let data = {
      "type": 0,
      "statement": query
    };

    return this._http.post(this._cs.getHost() + url, data);

  }


  public execute_Scalar(query: any): Observable<any> {
    let url = "/MMI/Database/Query";
    let data = {
      "type": 1,
      "statement": query
    };

    return this._http.post(this._cs.getHost() + url, data);

  }
  //Sync query
  public execute_Scalar_Sync(query: any) {
    let url = "/MMI/Database/Query";
    let data = {
      "type": 1,
      "statement": query
    };

    return this._http.post(this._cs.getHost() + url, data);

  }

  public query(query: any): Observable<any> {
    let url = "/MMI/Database/Query";
    let data = {
      "type": 2,
      "statement": query
    };

    return this._http.post(this._cs.getHost() + url, data);

  }

  //sync Query
  public query_Sync(query: any) {
    //let url = "/MMI/Database/Query";
    //let data = {
    //  "type": 2,
    //  "statement": query
    //};
    //const promise = this._http.post(this._cs.getHost() + url, data).toPromise();
    //promise.then((res) => {
    //  return res;
    //});

    let promise = new Promise((resolve, reject) => {
      let url = "/MMI/Database/Query";
      let data = {
      "type": 2,
      "statement": query
      };
      this._http.post(this._cs.getHost() + url, data).toPromise().then(res => {
        //success
        console.log(JSON.stringify(res));
        resolve();
      })
    });

    return promise;
  }


  //promise Request
  public query_Promise(query: any) {
    //set up query data
    let url = "/MMI/Database/Query";
    let data = {
      "type": 2,
      "statement": query
    };
    const promise = this._http.post(this._cs.getHost() + url, data).toPromise();
    return promise;
  }
}
