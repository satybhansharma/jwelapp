import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CityService } from './city.service';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from '../../shared/_alert';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from '../../app-routing.module';
import { StateModule } from '../state/state.module';



@NgModule({
  declarations: [CityComponent],
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
    StateModule,
    PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,CityComponent],
  providers: [CityService]
})
export class CityModule { }
