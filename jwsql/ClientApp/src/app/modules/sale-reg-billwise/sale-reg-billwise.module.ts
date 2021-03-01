import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { SaleRegBillwiseComponent } from './sale-reg-billwise.component';
@NgModule({
  declarations: [SaleRegBillwiseComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,SaleRegBillwiseComponent],
  providers: []
})
export class SaleRegBillwiseModule { }
