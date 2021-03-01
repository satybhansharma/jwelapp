import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { PeriodicSaleAnalysisComponent } from './periodic-sale-analysis.component';


@NgModule({
  declarations: [PeriodicSaleAnalysisComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,PeriodicSaleAnalysisComponent],
  providers: []
})
export class PeriodicSaleAnalysisModule { }
