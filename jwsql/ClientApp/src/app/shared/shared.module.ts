import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import{MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { AreaComponent } from './widget/area/area.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {MatCardModule} from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormDirective } from '../form.directive';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogRef } from '@angular/material/dialog';
import { MinisidebarComponent } from './component/minisidebar/minisidebar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from './_alert';
import { CommonService } from './services/common.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    FormDirective,
    MinisidebarComponent,
    LoginComponent,
    
    ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    DataTablesModule,
    ReactiveFormsModule,
    AlertModule

    ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    FlexLayoutModule,
    MatTooltipModule,
    DataTablesModule,
    MinisidebarComponent
    
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {},
    
  },CommonService]
  
})
export class SharedModule { }
