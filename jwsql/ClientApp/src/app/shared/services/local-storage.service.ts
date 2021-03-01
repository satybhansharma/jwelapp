import { Inject, Injectable } from '@angular/core';
import { map } from 'highcharts';

import {LOCAL_STORAGE,StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';


//key that is used to access the data in local storage
const STORAGE_KEY = 'cfgTmpSession';
const STORAGE_KEY_VER = 'verTmpSession';
const STORAGE_KEY_GVAR = 'globalVar';
const STORAGE_KEY_SERIES = 'series';
const STORAGE_KEY_CNAME = 'CNAME';
const STORAGE_KEY_CNAME_SINGLE = 'cname-first';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
 // private _cfgTmpList: Observable<any[]>;//= [];
  private _cfgTmpList= [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  //Set CFG_TMP into Local Storage
  public set_cfgtmp_LocalStorage(cfgtmp_Record: any): void {
    this.storage.set(STORAGE_KEY,cfgtmp_Record);
  }

  //GET Data from CFG_TMP Record
  public get_cfgtmp_LocalStorage(): Array<any> {
    let data = this.storage.get(STORAGE_KEY)||[];
    return data;

  }
  //SET VER_TMP into Local Storage
  public set_vertmp_LocalStorage(vertmp_Record: any): void {
    this.storage.set(STORAGE_KEY_VER,vertmp_Record);
  }
  //GET Data VER_TMP Record
  public get_vertmp_LocalStorage(): void {
    return this.storage.get(STORAGE_KEY_VER);
  }
  //Make Query From CFG_TMP from Local Storage
  public getPara(query: any): any {
    this._cfgTmpList = this.get_cfgtmp_LocalStorage();
    let record = this._cfgTmpList.filter(record=>record.vrcap==query);
    return record;
   
  }

  //SET PUBLIC_VARIABLE INTO LOCAL STORAGE
  public set_Global_VAR(globalVar: any) {
    this.storage.set(STORAGE_KEY_GVAR, globalVar);
  }
  //GET PUBLIC_VARIABLE FROM LOCAL_STORAGE
  public get_Global_VAR() {
    return this.storage.get(STORAGE_KEY_GVAR);
  }
  public remove_Global_VAR() {
    return this.storage.remove(STORAGE_KEY_GVAR);
  }

  //SET SERIES INTO LOCAL STORAGE
  public set_Series(series: any) {
    this.storage.remove(STORAGE_KEY_SERIES);
    this.storage.set(STORAGE_KEY_SERIES, series);
  }
  //GET SERIES FROM LOCAL STORAGE
  public get_Series() {
    return this.storage.get(STORAGE_KEY_SERIES);
  }

  //SET CNAME LIST INTO LOCAL STORAGE
  public set_Cname(records: any) {
    this.storage.set(STORAGE_KEY_CNAME,records);
  }
  //GET CNAME LIST FROM LOCAL STORAGE
  public get_Cname() {
    return this.storage.get(STORAGE_KEY_CNAME);
  }
  public remove_Cname() {
    return this.storage.remove(STORAGE_KEY_CNAME);
  }

  //SET CNAME Single Record into LOCAL STORAGE
  //public set_Cname_FirstRecord(record:any) {
  //  this.storage.set(STORAGE_KEY_CNAME_SINGLE,record);
  //}
  ////GET CNAME Single Record FROMLOCAL STORAGE
  //public get_Cname_FirstRecord() {
  // return this.storage.get(STORAGE_KEY_CNAME_SINGLE);
  //}
  ////REMOVE CNAME Single Record FROMLOCAL STORAGE
  //public remove_Cname_FirstRecord() {
  //  return this.storage.remove(STORAGE_KEY_CNAME_SINGLE);
  //}


  public set_QueryData(record: any) {
    return this.storage.set('queryData',record);
  }
  public get_QueryData() {
    return this.storage.get('queryData');
  }


}
