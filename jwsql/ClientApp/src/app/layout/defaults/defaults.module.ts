import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultsComponent } from './defaults.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
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
import {HttpClientModule,HttpClient} from '@angular/common/http';
import  {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import {AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DataTablesModule } from 'angular-datatables';
import { UnitmasterModule } from 'src/app/modules/unitmaster/unitmaster.module';
import { ColourModule } from 'src/app/modules/colour/colour.module';
import { ClarityModule } from 'src/app/modules/clarity/clarity.module';
import { GcodeModule } from 'src/app/modules/gcode/gcode.module';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { UnitconvModule } from 'src/app/modules/unitconv/unitconv.module';
import { IgroupModule } from '../../modules/igroup/igroup.module';
import { SizemasterModule } from '../../modules/sizemaster/sizemaster.module';
import { ShapeModule } from '../../modules/shape/shape.module';
import { StampmasterModule } from '../../modules/stamp/stampmaster.module';
import { AccountGroupModule } from 'src/app/modules/account-group/account-group.module';
import { ItemmasterModule } from 'src/app/modules/itemmaster/itemmaster.module';
import { StateModule } from 'src/app/modules/state/state.module';
import { CityModule } from 'src/app/modules/city/city.module';
import { LocationComponent } from 'src/app/modules/location/location.component';
import { LocationModule } from 'src/app/modules/location/location.module';
import { SundriesModule } from 'src/app/modules/sundries/sundries.module';
import { SeriesModule } from 'src/app/modules/series/series.module';
import { AccmastModule } from 'src/app/modules/accmast/accmast.module';
import { MainformModule } from 'src/app/modules/mainform/mainform.module';
import { InventoryButtonComponent } from '../../modules/inventory-button/inventory-button.component';
import { AccountButtonComponent } from '../../modules/account-button/account-button.component';
//import { SaleChildFormModule } from 'src/app/modules/sale-child-form/sale-child-form.module';
//import { SaleFormModule } from 'src/app/modules/sale-form/sale-form.module';
import { LedgerButtonComponent } from 'src/app/modules/ledger-button/ledger-button.component';
import { LedgerModule } from 'src/app/modules/ledger/ledger.module';
import { TrailBalanceModule } from 'src/app/modules/trail-balance/trail-balance.module';
import { FocusDirective } from '../../shared/customeDirective/focus.directive';
import { VoucherComponent } from 'src/app/modules/voucher/voucher.component';
import { PurchaseAnalysisButtonComponent } from 'src/app/modules/purchase-analysis-button/purchase-analysis-button.component';

import { PurchaseRegBillwiseComponent } from 'src/app/modules/purchase-reg-billwise/purchase-reg-billwise.component';
import { PurchaseRegDetailedComponent } from 'src/app/modules/purchase-reg-detailed/purchase-reg-detailed.component';
import { PurchasePlannerModule } from 'src/app/modules/purchase-planner/purchase-planner.module';
import { SupplyWiseModule } from 'src/app/modules/supply-wise/supply-wise.module';
import { SaleModule } from '../../modules/sale/sale.module';
import { PurchaseRegDetailedModule } from 'src/app/modules/purchase-reg-detailed/purchase-reg-detailed.module';
import { PurchaseRegBillwiseModule } from 'src/app/modules/purchase-reg-billwise/purchase-reg-billwise.module';
import { SaleAnalysisComponent } from 'src/app/modules/sale-analysis/sale-analysis.component';
import { PeriodicSaleAnalysisComponent } from 'src/app/modules/periodic-sale-analysis/periodic-sale-analysis.component';
import { FestivalAnalysisComponent } from 'src/app/modules/festival-analysis/festival-analysis.component';
import { DiscountBillsComponent } from 'src/app/modules/discount-bills/discount-bills.component';
import { MonthlySaleAnalysisComponent } from 'src/app/modules/monthly-sale-analysis/monthly-sale-analysis.component';
import { SaleRegBillwiseComponent } from 'src/app/modules/sale-reg-billwise/sale-reg-billwise.component';
import { SaleRegDetailedComponent } from 'src/app/modules/sale-reg-detailed/sale-reg-detailed.component';
import { PeriodicSaleAnalysisModule } from 'src/app/modules/periodic-sale-analysis/periodic-sale-analysis.module';
import { FestivalAnalysisModule } from 'src/app/modules/festival-analysis/festival-analysis.module';
import { DiscountBillsModule } from 'src/app/modules/discount-bills/discount-bills.module';
import { MonthlySaleAnalysisModule } from 'src/app/modules/monthly-sale-analysis/monthly-sale-analysis.module';
import { SaleRegBillwiseModule } from 'src/app/modules/sale-reg-billwise/sale-reg-billwise.module';
import { SaleRegDetailedModule } from 'src/app/modules/sale-reg-detailed/sale-reg-detailed.module';
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
