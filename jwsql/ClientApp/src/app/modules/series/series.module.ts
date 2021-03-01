import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesComponent } from './series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from '../../app-routing.module';
import { SeriesService} from './series.service';
import { AlertModule } from '../../shared/_alert';
import { CommonService } from '../../shared/services/common.service';



@NgModule({
  declarations: [SeriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,DataTablesModule,FormsModule,
    AlertModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    AutocompleteLibModule,
    PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,SeriesComponent],
  providers:[SeriesService,CommonService]
})
export class SeriesModule { }
