import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../../shared/_alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UnitconvComponent } from './unitconv.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UnitmasterModule } from '../unitmaster/unitmaster.module';



@NgModule({
  declarations: [UnitconvComponent],
  imports: [
    CommonModule,AlertModule,ReactiveFormsModule,DataTablesModule,
    FormsModule,MatIconModule,MatButtonModule,AutocompleteLibModule,
    RouterModule,MatDialogModule,AppRoutingModule,PaginationModule.forRoot(),
    UnitmasterModule
  ],
  exports:[UnitconvComponent]
})
export class UnitconvModule { }
