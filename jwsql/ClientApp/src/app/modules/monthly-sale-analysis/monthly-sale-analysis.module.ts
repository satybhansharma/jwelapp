import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { MonthlySaleAnalysisComponent } from './monthly-sale-analysis.component';


@NgModule({
  declarations: [MonthlySaleAnalysisComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [AppRoutingModule,MonthlySaleAnalysisComponent],
  providers: []
})
export class MonthlySaleAnalysisModule { }
