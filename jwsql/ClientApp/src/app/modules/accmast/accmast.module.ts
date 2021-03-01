import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AccmastComponent } from './accmast.component';

const routes: Routes = [
  {
    path: 'accmast',
    component:AccmastComponent
  }
];

@NgModule({
  declarations: [AccmastComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,MatIconModule,MatButtonModule,
    RouterModule,
    CustomFormsModule, PaginationModule.forRoot(),
   
  ],
  exports:[AccmastComponent]
})
export class AccmastModule { }
