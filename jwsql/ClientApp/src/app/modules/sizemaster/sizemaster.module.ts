import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from '../../app-routing.module';
import { SizemasterService } from './sizemaster.service';
import { SizemasterComponent } from './sizemaster.component';
//import { ItemmasterModule } from '../itemmaster/itemmaster.module';



@NgModule({
  declarations: [SizemasterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,FormsModule,MatIconModule,MatButtonModule,//ItemmasterModule,
    RouterModule,MatDialogModule,AutocompleteLibModule,PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,SizemasterComponent],
  providers: [SizemasterService]
})
export class SizemasterModule { }
