import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './page/sales/sales.component';
import { EmployeeReportComponent } from './page/employee-report/employee-report.component';
import { ProductReportComponent } from './page/product-report/product-report.component';
import { AdminComponent } from './page/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    EmployeeReportComponent,
    ProductReportComponent,
    AdminComponent
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
