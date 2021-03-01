import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from '../../shared/_alert';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ItemPipe } from './item.pipe';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ItemMast } from '../../shared/models/item-mast';
import { ItemsComponent } from './items/items.component';
import { UnitmasterModule } from '../unitmaster/unitmaster.module';
import { GcodeModule } from '../gcode/gcode.module';
import {CategoryModule} from '../category/category.module';
import { StampmasterModule } from '../stamp/stampmaster.module';
import { IgroupModule } from '../igroup/igroup.module';




//import{UnitmasterModule} from '../../UnitmasterModule';

@NgModule({
  declarations: [ItemPipe, ItemsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CustomFormsModule,
    PaginationModule.forRoot(),
    AutocompleteLibModule,
    UnitmasterModule,
    GcodeModule,
    CategoryModule,
    StampmasterModule,
    IgroupModule
    
    ]
  ,
  exports: [ItemsComponent],
})
export class ItemmasterModule { }
