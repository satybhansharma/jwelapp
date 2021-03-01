import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesComponent } from './series/series.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SaleChildFormComponent } from './sale-child-form/sale-child-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GrdFilterPipe } from '../../shared/pipes/grd-filter.pipe';
import { AccountChildComponent } from './account-child/account-child.component';
import { ListFilterPipe } from '../../shared/pipes/list-filter.pipe';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [SeriesComponent,
    SaleChildFormComponent,
    SaleFormComponent,
    GrdFilterPipe,
    AccountChildComponent,
    ListFilterPipe],
  imports: [
    CommonModule,
     MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    AutocompleteLibModule,
    AgGridModule.withComponents([])
    ]
  ,
  exports: [SaleFormComponent,SaleChildFormComponent,SeriesComponent,AccountChildComponent]
})
export class SaleModule { }
