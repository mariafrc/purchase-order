import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {IpcService} from './services/ipc.service';
import {UtilsService} from './services/utils.service';

//primeng imports
import { PrimengModule } from './primeng/primeng.module';

//components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { SupplierItemComponent } from './components/supplier/supplier-item/supplier-item.component';
import { SupplierFormComponent } from './components/supplier/supplier-form/supplier-form.component';
import { InChargeComponent } from './components/inCharge/in-charge/in-charge.component';
import { InChargeItemComponent } from './components/inCharge/in-charge-item/in-charge-item.component';
import { InChargeFormComponent } from './components/inCharge/in-charge-form/in-charge-form.component';
import { ArticleComponent } from './components/article/article/article.component';
import { ArticleFormComponent } from './components/article/article-form/article-form.component';
import { ArticleItemComponent } from './components/article/article-item/article-item.component';
import { OrderFormComponent } from './components/orderForm/order-form/order-form.component';
import { OrderFormArticlesComponent } from './components/orderForm/order-form-articles/order-form-articles.component';
import { DatabaseConnectionComponent } from './components/database-connection/database-connection.component';
import { OrderFormListComponent } from './components/orderForm/order-form-list/order-form-list.component';
import { OrderFormFocusComponent } from './components/orderForm/order-form-focus/order-form-focus.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SupplierComponent,
    SupplierItemComponent,
    SupplierFormComponent,
    InChargeComponent,
    InChargeItemComponent,
    InChargeFormComponent,
    ArticleComponent,
    ArticleFormComponent,
    ArticleItemComponent,
    OrderFormComponent,
    OrderFormArticlesComponent,
    DatabaseConnectionComponent,
    OrderFormListComponent,
    OrderFormFocusComponent,
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
  entryComponents: [SupplierFormComponent, InChargeFormComponent, ArticleFormComponent],
  providers: [IpcService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
