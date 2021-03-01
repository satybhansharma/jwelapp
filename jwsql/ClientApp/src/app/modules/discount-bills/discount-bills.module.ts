import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { DiscountBillsComponent } from './discount-bills.component';


@NgModule({
  declarations: [DiscountBillsComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,DiscountBillsComponent],
  providers: [DatePipe]
})
export class DiscountBillsModule { }
