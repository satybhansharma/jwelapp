import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StampComponent } from './stamp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from '../../app-routing.module';
import { StampService } from './stamp.service';
import { ColourModule } from '../colour/colour.module';
import { ClarityModule } from '../clarity/clarity.module';
import { SizemasterModule } from '../sizemaster/sizemaster.module';
import { ShapeModule } from '../shape/shape.module';
import { AlertModule } from '../../shared/_alert';
//import { ItemmasterModule } from '../itemmaster/itemmaster.module';



@NgModule({
  declarations: [StampComponent],
  imports: [
    CommonModule,ReactiveFormsModule,DataTablesModule,FormsModule,
    AlertModule,MatIconModule,MatButtonModule,RouterModule,MatDialogModule,
    ColourModule,
    ClarityModule,
    SizemasterModule,
    ShapeModule,
    //ItemmasterModule,
    AutocompleteLibModule,PaginationModule.forRoot()
  ],
  exports: [AppRoutingModule,StampComponent],
  providers:[StampService]
})
export class StampmasterModule { }
