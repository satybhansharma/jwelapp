import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultsComponent } from './layout/defaults/defaults.component';
import { CategoryComponent } from './modules/category/category.component';
import { ClarityComponent } from './modules/clarity/clarity.component';
import { ColourComponent } from './modules/colour/colour.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GcodeComponent } from './modules/gcode/gcode.component';
import { UnitconvComponent } from './modules/unitconv/unitconv.component';
import { UnitmasterComponent } from './modules/unitmaster/unitmaster.component';
import { SharedserviceService } from './shared/services/sharedservice.service';
import { IgroupComponent } from './modules/igroup/igroup.component';
import { SizemasterComponent } from './modules/sizemaster/sizemaster.component';
import { ShapeComponent } from './modules/shape/shape.component';
import { StampComponent } from './modules/stamp/stamp.component';
import { AccountGroupComponent } from './modules/account-group/account-group.component';
import { ItemsComponent } from './modules/itemmaster/items/items.component';
import { StateComponent } from './modules/state/state.component';
import { CityComponent } from './modules/city/city.component';
import { LocationComponent } from './modules/location/location.component';
import { SundriesComponent } from './modules/sundries/sundries.component';
import { SeriesComponent } from './modules/series/series.component';
import { AccmastComponent } from './modules/accmast/accmast.component';
import { MainformComponent } from './modules/mainform/mainform.component';
import { InventoryButtonComponent } from './modules/inventory-button/inventory-button.component';
import { AccountButtonComponent } from './modules/account-button/account-button.component';
//import { SaleFormComponent } from './modules/sale-form/sale-form.component';
import { LedgerButtonComponent } from './modules/ledger-button/ledger-button.component';
import { LedgerComponent } from './modules/ledger/ledger.component';
import { TrailBalanceModule } from './modules/trail-balance/trail-balance.module';
import { TrailBalanceComponent } from './modules/trail-balance/trail-balance.component';
import { VoucherComponent } from './modules/voucher/voucher.component';
import { PurchaseAnalysisButtonComponent } from './modules/purchase-analysis-button/purchase-analysis-button.component';
import { SupplyWiseComponent } from './modules/supply-wise/supply-wise.component';
import { PurchaseRegBillwiseComponent } from './modules/purchase-reg-billwise/purchase-reg-billwise.component';
import { PurchaseRegDetailedComponent } from './modules/purchase-reg-detailed/purchase-reg-detailed.component';
import { PurchasePlannerComponent } from './modules/purchase-planner/purchase-planner.component';
import { SaleFormComponent } from './modules/sale/sale-form/sale-form.component';
import { SaleAnalysisComponent } from './modules/sale-analysis/sale-analysis.component';
import { PeriodicSaleAnalysisComponent } from './modules/periodic-sale-analysis/periodic-sale-analysis.component';
import { FestivalAnalysisComponent } from './modules/festival-analysis/festival-analysis.component';
import { DiscountBillsComponent } from './modules/discount-bills/discount-bills.component';
import { MonthlySaleAnalysisComponent } from './modules/monthly-sale-analysis/monthly-sale-analysis.component';
import { SaleRegBillwiseComponent } from './modules/sale-reg-billwise/sale-reg-billwise.component';
import { SaleRegDetailedComponent } from './modules/sale-reg-detailed/sale-reg-detailed.component';
import { LoginComponent } from './shared/login/login.component';




const routes: Routes = [
  //{
  //  path: '',
  //  component:LoginComponent
  //},
  {
    path: 'login',
    component:LoginComponent
  },
  {
  path: '',
  component: DefaultsComponent,
  children:
    [
      {
        path: '',
        component: DashboardComponent,
      },


      {
        path: 'unitmaster',
        component: UnitmasterComponent
      },

      {
        path: 'colour',
        component: ColourComponent
      },

      {
        path: 'clarity',
        component: ClarityComponent
      },

      {
        path: 'gcode',
        component: GcodeComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'igroup',
        component: IgroupComponent
      },
      /* {
        path: 'igroup',
        component:IgroupComponent
      }, */
      {
        path: 'unitconv',
        component: UnitconvComponent
      },
      {
        path: 'size',
        component: SizemasterComponent
      },
      {
        path: 'shape',
        component: ShapeComponent
      },
      {
        path: 'stamp',
        component:StampComponent
      },
      {
        path:'acgroup',
        component:AccountGroupComponent
      },
      {
        path:'itemmaster',
        component:ItemsComponent
      },
      {
        path:'state',
        component: StateComponent
      },
      {
        path:'city',
        component:CityComponent
      },
      {
        path: 'location',
        component: LocationComponent
      },
      {
        path: 'sundry',
        component: SundriesComponent
      },
      {
        path: 'series',
        component: SeriesComponent
      },
      {
        path:'accmast',
        component:AccmastComponent
      },
      {
        path:'mainform',
        component: MainformComponent
      },
      {
        path: 'inventory',
        component:InventoryButtonComponent
      },
      {
        path: 'accounting',
        component:AccountButtonComponent
      },
      {
        path: 'ledger-button',
        component:LedgerButtonComponent
      },
      {
        path: 'ledger',
        component:LedgerComponent
      },
      {
        path: 'trail-balance',
        component:TrailBalanceComponent
      },    
      {
        path: 'sale-form/:id',
        component:SaleFormComponent
      },
      {
        path:'voucher',
        component:VoucherComponent
      },
      {
        path:'purchase-analysis-button',
        component:PurchaseAnalysisButtonComponent
      },
      {
      path:'supply-wise',
      component:SupplyWiseComponent
      },
      {
      path:'purchase-reg-billwise/:id',
      component:PurchaseRegBillwiseComponent
      },
      {
        path:'purchase-reg-detailed',
        component:PurchaseRegDetailedComponent
        },
        {
          path:'purchase-planner',
          component:PurchasePlannerComponent
          },
          {
            path:'sale-analysis',
            component:SaleAnalysisComponent
          },
          {
            path:'periodic-sale-analysis',
            component:PeriodicSaleAnalysisComponent
          },
          {
            path:'festival-analysis',
            component:FestivalAnalysisComponent
          },
          {
            path:'discount-bills',
            component:DiscountBillsComponent
          },
          {
            path:'monthly-sale-analysis',
            component:MonthlySaleAnalysisComponent
          },
          {
            path:'sale-reg-billwise',
            component:SaleRegBillwiseComponent
          },
          {
            path:'sale-reg-detailed',
            component:SaleRegDetailedComponent
          }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  providers:[SharedserviceService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
