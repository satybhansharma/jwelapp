import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillCommunicationService {

  constructor() { }
  //get Bill Type
  private _billTypeDataSource = new Subject<Object>();
  _billData = this._billTypeDataSource.asObservable();
  sendData(data:any) {
    this._billTypeDataSource.next(data);
  }

  //Get series Record From Series Form to Sale Form
  private _seriesDataSource = new Subject<Object>();
  _SeriesData = this._seriesDataSource.asObservable();
  SendSeriesData(data: any) {
    this._seriesDataSource.next(data);
  }

  //Get Account Data Record
  private _AccountDataSource = new Subject<Object>();
  _AccountData = this._AccountDataSource.asObservable();
  SendAccountData(data: any) {
    this._AccountDataSource.next(data);
  }



}
