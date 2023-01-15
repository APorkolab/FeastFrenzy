import { EmployeeReportComponent } from './page/employee-report/employee-report.component';
import { SalesComponent } from './page/sales/sales.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './page/employees/employees.component';
import { ProductsComponent } from './page/products/products.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { ProductReportComponent } from './page/product-report/product-report.component';
import { SalesReportComponent } from './page/sales-report/sales-report.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { SaleDetailComponent } from './page/sale-detail/sale-detail.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'sales/:id', component: SaleDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'sales-report', component: SalesReportComponent },
  { path: 'employee-report', component: EmployeeReportComponent },
  { path: 'product-report', component: ProductReportComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
