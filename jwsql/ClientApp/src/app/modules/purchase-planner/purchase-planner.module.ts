import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { PurchasePlannerComponent } from './purchase-planner.component';
// import 'ag-grid-enterprise';


@NgModule({
  declarations: [PurchasePlannerComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,PurchasePlannerComponent],
  providers: []
})
export class PurchasePlannerModule { }
