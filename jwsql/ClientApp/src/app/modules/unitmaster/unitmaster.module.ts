import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitmasterComponent } from './unitmaster.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from '../../shared/_alert';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';


import { MatDialogModule } from '@angular/material/dialog';
import {SharedserviceService} from '../../shared/services/sharedservice.service'
import { UnitmasterService } from '../unitmaster.service';




@NgModule({
  declarations: [UnitmasterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    AlertModule, MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    AutocompleteLibModule,
    PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,UnitmasterComponent],
  providers: [UnitmasterService]
})
export class UnitmasterModule { }
