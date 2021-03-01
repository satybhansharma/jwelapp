import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityComponent } from './clarity.component';
import { ClarityService } from './clarity.service';
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
import { UnitmasterModule } from '../unitmaster/unitmaster.module';
import { MatDialogModule } from '@angular/material/dialog';
import {SharedserviceService} from '../../shared/services/sharedservice.service'
//import { ItemmasterModule } from '../itemmaster/itemmaster.module';





@NgModule({
  declarations: [ClarityComponent],
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
    //ItemmasterModule,
    //CategoryMasterModule,
    
//ColourmasterModule,
    PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,ClarityComponent],
  providers: [ClarityService]
})
export class ClarityModule { }
