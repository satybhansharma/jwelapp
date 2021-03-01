import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import * as ts from 'typescript';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  localstorage: Storage;
  

  private subject = new Subject<any>();
  sendMessage(message: string) {
   // alert("i m in Internal Services");
 //   alert(message);
    this.subject.next({text:message});
  }
  clearMessage() {
    this.subject.next();
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  private _teacherMessageSource = new Subject<string>();
  teacherMessage$ = this._teacherMessageSource.asObservable();


  constructor() {
    this.localstorage = window.localStorage;
  }
  SendData(message: string) {
    this._teacherMessageSource.next(message);
    
  }

  //Observable Arryay of data
  private _unitSource = new Subject<any>();
  unitData$ = this._unitSource.asObservable();
  sendUnitData(data:any) {
    this._unitSource.next(data);
  }

  //configure Shared Data among any Components
  private _sharedDataSource = new Subject<Object>();
  _sharedData = this._sharedDataSource.asObservable();
  sendSharedData(data: any) {
    this._sharedDataSource.next(data);
  }


  //local Storages
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localstorage.getItem(key));
    }
    return null;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localstorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localstorage.removeItem(key);
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localstorage
  }

  


}
