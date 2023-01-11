import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Sale {
  employee: string;
  product: string;
  quantity: number;
  price: number;
  date: Date;
}

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})

export class EmployeeReportComponent {
  sales: Sale[] = [];
  newPrices = {
    coffee: 0,
    soda: 0,
    menu: 0
  };

  employees: any[] = [];
  selectedMonth!: string;

  constructor(private http: HttpClient) { }


  getEmployeeReport() {
    this.http.get(`api/employees?month=${this.selectedMonth}`).subscribe(data => {
      this.employees = data;
    });
  }

  updatePrices() {
    // Logic to update the prices
  }

}
