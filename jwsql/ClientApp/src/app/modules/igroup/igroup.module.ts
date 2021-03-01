import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgroupComponent } from './igroup.component';

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
import { CategoryService} from '../category/category.service';
import { IgroupService } from '../../shared/services/igroup.service';
import { UnitmasterModule } from '../unitmaster/unitmaster.module';
import { StampmasterModule } from '../stamp/stampmaster.module';



@NgModule({
  declarations: [IgroupComponent],
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
    PaginationModule.forRoot(),
    UnitmasterModule,
    StampmasterModule
  ],
  exports: [AppRoutingModule,IgroupComponent],
  providers: [IgroupService]
})
export class IgroupModule { }
