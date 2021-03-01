import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { DefaultsComponent } from './defaults.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../..//shared/shared.module';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import  {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import  {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import {AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DataTablesModule } from 'angular-datatables';
import { UnitmasterModule } from '../../modules/unitmaster/unitmaster.module';
import { ColourModule } from '../../modules/colour/colour.module';
import { ClarityModule } from '../../modules/clarity/clarity.module';
import { GcodeModule } from '../../modules/gcode/gcode.module';
import { CategoryModule } from '../../modules/category/category.module';
import { UnitconvModule } from '../../modules/unitconv/unitconv.module';
import { IgroupModule } from '../../modules/igroup/igroup.module';
import { SizemasterModule } from '../../modules/sizemaster/sizemaster.module';
import { ShapeModule } from '../../modules/shape/shape.module';
import { StampmasterModule } from '../../modules/stamp/stampmaster.module';
import { AccountGroupModule } from '../../modules/account-group/account-group.module';
import { ItemmasterModule } from '../../modules/itemmaster/itemmaster.module';
import { StateModule } from '../../modules/state/state.module';
import { CityModule } from '../../modules/city/city.module';

import { LocationModule } from '../../modules/location/location.module';
import { SundriesModule } from '../../modules/sundries/sundries.module';
import { SeriesModule } from '../../modules/series/series.module';
import { AccmastModule } from '../../modules/accmast/accmast.module';
import { MainformModule } from '../../modules/mainform/mainform.module';
import { InventoryButtonComponent } from '../../modules/inventory-button/inventory-button.component';
import { AccountButtonComponent } from '../../modules/account-button/account-button.component';

import { LedgerButtonComponent } from '../../modules/ledger-button/ledger-button.component';
import { LedgerModule } from '../../modules/ledger/ledger.module';
import { TrailBalanceModule } from '../../modules/trail-balance/trail-balance.module';
import { FocusDirective } from '../../shared/customeDirective/focus.directive';
import { VoucherComponent } from '../../modules/voucher/voucher.component';
import { PurchaseAnalysisButtonComponent } from '../../modules/purchase-analysis-button/purchase-analysis-button.component';


import { PurchasePlannerModule } from '../../modules/purchase-planner/purchase-planner.module';
import { SupplyWiseModule } from '../../modules/supply-wise/supply-wise.module';
import { SaleModule } from '../../modules/sale/sale.module';
import { PurchaseRegDetailedModule } from '../../modules/purchase-reg-detailed/purchase-reg-detailed.module';
import { PurchaseRegBillwiseModule } from '../../modules/purchase-reg-billwise/purchase-reg-billwise.module';
import { SaleAnalysisComponent } from '../../modules/sale-analysis/sale-analysis.component';

import { PeriodicSaleAnalysisModule } from '../../modules/periodic-sale-analysis/periodic-sale-analysis.module';
import { FestivalAnalysisModule } from '../../modules/festival-analysis/festival-analysis.module';
import { DiscountBillsModule } from '../../modules/discount-bills/discount-bills.module';
import { MonthlySaleAnalysisModule } from '../../modules/monthly-sale-analysis/monthly-sale-analysis.module';
import { SaleRegBillwiseModule } from '../../modules/sale-reg-billwise/sale-reg-billwise.module';
import { SaleRegDetailedModule } from '../../modules/sale-reg-detailed/sale-reg-detailed.module';
import { CommonService } from '../../shared/services/common.service';




@NgModule({
  declarations: 
  [   DefaultsComponent,
      DashboardComponent,
      InventoryButtonComponent,
      AccountButtonComponent,
      LedgerButtonComponent,
      FocusDirective,
      VoucherComponent,
      PurchaseAnalysisButtonComponent,
      SaleAnalysisComponent
      
  ]
  ,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule,
    MatPaginatorModule,
    AutocompleteLibModule,
    DataTablesModule,
    UnitmasterModule,
    ColourModule,
    ClarityModule,
    GcodeModule,
    CategoryModule,
    UnitconvModule,
    
    SizemasterModule,
    ShapeModule,
    StampmasterModule,
    AccountGroupModule,
    ItemmasterModule,
    IgroupModule,
    StateModule,
    CityModule,
    LocationModule,
    SundriesModule,
    SeriesModule,
    AccmastModule,
    MainformModule,
    LedgerModule,
    TrailBalanceModule,
    PurchasePlannerModule,
    SupplyWiseModule,
    SaleModule,
    PurchaseRegDetailedModule,
    PurchaseRegBillwiseModule,
    PeriodicSaleAnalysisModule,
    FestivalAnalysisModule,
    DiscountBillsModule,
    MonthlySaleAnalysisModule,
    SaleRegBillwiseModule,
    SaleRegDetailedModule
    
   

   

    
    
    
],
exports:[
  MatCardModule,
  FormsModule,ReactiveFormsModule
  ],
providers:[CommonService]
})
export class DefaultsModule { }
