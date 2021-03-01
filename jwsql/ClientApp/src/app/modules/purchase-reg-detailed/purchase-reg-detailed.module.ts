import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from '../../app-routing.module';
import { PurchaseRegDetailedComponent } from './purchase-reg-detailed.component';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [PurchaseRegDetailedComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    MatIconModule
  ],
  exports: [AppRoutingModule,PurchaseRegDetailedComponent],
  providers: [DatePipe]
})
export class PurchaseRegDetailedModule { }
