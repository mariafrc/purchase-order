import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnectionGuard} from './guards/connection.guard';

import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { InChargeComponent } from './components/inCharge/in-charge/in-charge.component';
import { ArticleComponent } from './components/article/article/article.component';
import {OrderFormComponent} from './components/orderForm/order-form/order-form.component';
import { DatabaseConnectionComponent } from './components/database-connection/database-connection.component';
import { OrderFormListComponent } from './components/orderForm/order-form-list/order-form-list.component';
import { OrderFormFocusComponent } from './components/orderForm/order-form-focus/order-form-focus.component';

const routes: Routes = [
	{path: '', redirectTo: 'connection', pathMatch: 'full'},
	{path: 'connection', component: DatabaseConnectionComponent},
	{path: 'supplier', component: SupplierComponent, canActivate: [ConnectionGuard]},
	{path: 'inCharge', component: InChargeComponent, canActivate: [ConnectionGuard]},
	{path: 'supplier/:id/article', component: ArticleComponent, canActivate: [ConnectionGuard]},
	{path: 'orderForm/form', component: OrderFormComponent, canActivate: [ConnectionGuard]},
	{path: 'orderForm/list', component: OrderFormListComponent, canActivate: [ConnectionGuard]},
	{path: 'orderForm/list/:id', component: OrderFormFocusComponent, canActivate: [ConnectionGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
