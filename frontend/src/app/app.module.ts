import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './page/sales/sales.component';
import { EmployeeReportComponent } from './page/employee-report/employee-report.component';
import { ProductReportComponent } from './page/product-report/product-report.component';
import { AdminComponent } from './page/admin/admin.component';
import { EmployeesComponent } from './page/employees/employees.component';
import { ProductsComponent } from './page/products/products.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SalesReportComponent } from './page/sales-report/sales-report.component';
import { EmployeeDetailCComponent } from './page/employee-detail-c/employee-detail-c.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { SaleDetailComponent } from './page/sale-detail/sale-detail.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    EmployeeReportComponent,
    ProductReportComponent,
    AdminComponent,
    EmployeesComponent,
    ProductsComponent,
    PageNotFoundComponent,
    SalesReportComponent,
    EmployeeDetailCComponent,
    EmployeeDetailComponent,
    SaleDetailComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
