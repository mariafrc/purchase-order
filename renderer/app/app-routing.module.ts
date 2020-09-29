import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';
import { InChargeComponent } from './components/inCharge/in-charge/in-charge.component';

const routes: Routes = [
	{path: '', redirectTo: 'supplier', pathMatch: 'full'},
	{path: 'supplier', component: SupplierComponent},
	{path: 'inCharge', component: InChargeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
