import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IpcService} from './services/ipc.service';

//primeng imports
import { PrimengModule } from './primeng/primeng.module';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { SupplierItemComponent } from './components/supplier/supplier-item/supplier-item.component';
import { SupplierFormComponent } from './components/supplier/supplier-form/supplier-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SupplierComponent,
    SupplierItemComponent,
    SupplierFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    CommonModule,
  ],
  entryComponents: [SupplierFormComponent],
  providers: [IpcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
