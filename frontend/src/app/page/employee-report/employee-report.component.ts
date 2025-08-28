import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styles: ['']
})
export class EmployeeReportComponent implements OnInit {

  employees: Employee[] = [];
  purchases: Purchase[] = [];
  month!: number;
  year!: number;
  employeePurchases!: Map<Employee, number>;
  newPrices: any;

  constructor(private employeeService: EmployeeService, private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.getEmployees();
    this.getPurchases();
    this.employeePurchases = new Map<Employee, number>();
    const currentDate = new Date();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getPurchases(): void {
    this.purchaseService.getPurchases()
      .subscribe(purchases => this.purchases = purchases);
  }

  calculateEmployeePurchases(): void {
    this.employeePurchases.clear();
    this.employees.forEach(employee => this.employeePurchases.set(employee, 0));
    this.purchases.forEach(purchase => {
      const purchaseDate = new Date(purchase.date);
      if (purchaseDate.getMonth() === this.month && purchaseDate.getFullYear() === this.year) {
        const employee = this.employees.find(e => e.id === purchase.employeeId);
        if (employee) {
          this.employeePurchases.set(employee, this.employeePurchases.get(employee)! + (purchase.total || 0));
        }
      }
    });
  }


  updatePrices() {
    // Logic to update the prices
  }

}