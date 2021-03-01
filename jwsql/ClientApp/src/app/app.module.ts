import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultsModule } from './layout/defaults/defaults.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AlertModule } from './shared/_alert';
import { RouterModule } from '@angular/router';
import { UnitmasterComponent } from './modules/unitmaster/unitmaster.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './shared/login/login.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { CommonService } from './shared/services/common.service';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultsModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    AgGridModule.withComponents([]),
    StorageServiceModule,
    ScrollingModule,

    RouterModule.forRoot([
    { path: 'unitmaster', component: UnitmasterComponent }
], { relativeLinkResolution: 'legacy' })
    
    
  ],
  exports: [
    DefaultsModule,
    
  ],
  providers: [LocalStorageService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
