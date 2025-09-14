import { PurchaseReportComponent } from './page/purchase-report/purchase-report.component';
import { PurchaseDetailComponent } from './page/purchase-detail/purchase-detail.component';

import { EmployeeReportComponent } from './page/employee-report/employee-report.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './page/employees/employees.component';
import { ProductsComponent } from './page/products/products.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { ProductReportComponent } from './page/product-report/product-report.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { PurchasesComponent } from './page/purchases/purchases.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'purchase/:id', component: PurchaseDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'purchase-report', component: PurchaseReportComponent },
  { path: 'employee-report', component: EmployeeReportComponent },
  { path: 'product-report', component: ProductReportComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Export routes for standalone bootstrap
export { routes };
