import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeReportComponent } from './page/employee-report/employee-report.component';
import { ProductReportComponent } from './page/product-report/product-report.component';
import { AdminComponent } from './page/admin/admin.component';
import { EmployeesComponent } from './page/employees/employees.component';
import { ProductsComponent } from './page/products/products.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { PurchasesComponent } from './page/purchases/purchases.component';
import { PurchaseDetailComponent } from './page/purchase-detail/purchase-detail.component';
import { PurchaseReportComponent } from './page/purchase-report/purchase-report.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeReportComponent,
    ProductReportComponent,
    AdminComponent,
    EmployeesComponent,
    ProductsComponent,
    PageNotFoundComponent,
    EmployeeDetailComponent,
    ProductDetailComponent,
    PurchasesComponent,
    PurchaseDetailComponent,
    PurchaseReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
