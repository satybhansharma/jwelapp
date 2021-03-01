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
import { SundriesComponent } from './sundries.component';
import { SundryService } from './sundry.service';


@NgModule({
  declarations: [SundriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    AutocompleteLibModule,
    PaginationModule.forRoot()

  ],
  exports: [AppRoutingModule,SundriesComponent],
  providers: [SundryService]
})
export class SundriesModule { }
