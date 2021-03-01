import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { PurchaseRegBillwiseComponent } from './purchase-reg-billwise.component';


@NgModule({
  declarations: [PurchaseRegBillwiseComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,PurchaseRegBillwiseComponent],
  providers: [DatePipe]
})
export class PurchaseRegBillwiseModule { }
