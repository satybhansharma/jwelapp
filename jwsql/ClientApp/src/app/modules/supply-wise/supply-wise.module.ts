import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { SupplyWiseComponent } from './supply-wise.component';


@NgModule({
  declarations: [SupplyWiseComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  exports: [AppRoutingModule,SupplyWiseComponent],
  providers: []
})
export class SupplyWiseModule { }
