import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './components/supplier/supplier/supplier.component';

const routes: Routes = [
	{path: '', redirectTo: 'supplier', pathMatch: 'full'},
	{path: 'supplier', component: SupplierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
