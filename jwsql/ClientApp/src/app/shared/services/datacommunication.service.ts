import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatacommunicationService {

  constructor() { }
  //Data Communications for New record
  private _NewDataSource = new Subject<Object>();
  _NewData = this._NewDataSource.asObservable();
  sendNewRecord(data: any) {
    this._NewDataSource.next(data);
  }

  //Data Communcations for Existing record
  private _ExistDataSource = new Subject<Object>();
  _existData = this._ExistDataSource.asObservable();
  sendExistData(data:any) {
    this._ExistDataSource.next(data);
  }

  //Operation Data Source
  private _OperationDataSource = new Subject<Object>();
  _operation = this._OperationDataSource.asObservable();
  sendOperationData(data: any) {
    this._OperationDataSource.next(data);
  }

  //Cancel Operation Communications
  private _cancelDataSource = new Subject<Object>();
  _cancel = this._cancelDataSource.asObservable();
  sendCancelOperationData(data: any) {
    this._cancelDataSource.next(data);
  }

  
  //child Dialog DataSource
  
  private _DialogDatasource = new Subject<Object>();
  _DialogData = this._DialogDatasource.asObservable();
  sendChildDialogData(data: any) {
    this._DialogDatasource.next(data);
  }

  //child Component Request Datasource
  private _childRequestData = new BehaviorSubject(Object);
  _childRequest = this._childRequestData.asObservable();
  _sendChildRequest(data: any) {
    this._childRequestData.next(data);
  }

  //child Component Response Datasource
  private _childResponseData = new BehaviorSubject(Object);
  _childResponse = this._childResponseData.asObservable();
  _sendChildResponse(data: any) {
    this._childResponseData.next(data);
  }

  //send sale Child Data
  private saleChildData = new BehaviorSubject(Object);
  _getSaleChildData = this.saleChildData.asObservable();
  _sendSaleChildData(data: any) {
    this.saleChildData.next(data);
  }


  //call common Data
  private _callSideBarResponseData = new BehaviorSubject(Object);
  _sideBarResponse = this._callSideBarResponseData.asObservable();
  _sendSidebarReponse(data: any) {
    this._callSideBarResponseData.next(data);
  }
  
  




}
