import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Sale } from 'src/app/model/sale';
import { SaleService } from 'src/app/service/sale.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {

  employees: Employee[] = [];
  sales: Sale[] = [];
  month!: number;
  year!: number;
  employeeSales!: Map<Employee, number>;

  constructor(private employeeService: EmployeeService, private saleService: SaleService) { }

  ngOnInit() {
    this.getEmployees();
    this.getSales();
    this.employeeSales = new Map<Employee, number>();
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getSales(): void {
    this.saleService.getSales()
      .subscribe(sales => this.sales = sales);
  }

  calculateEmployeeSales(): void {
    this.employeeSales.clear();
    this.employees.forEach(employee => this.employeeSales.set(employee, 0));

    this.sales.forEach(sale => {
      const saleDate = new Date(sale.date);
      if (saleDate.getMonth() === this.month && saleDate.getFullYear() === this.year) {
        const employee = this.employees.find(e => e.id === sale.employeeId);
        if (employee) {
          this.employeeSales.set(employee, this.employeeSales.get(employee) + sale.total);
        }
      }
    });
  }

  updatePrices() {
    // Logic to update the prices
  }

}
