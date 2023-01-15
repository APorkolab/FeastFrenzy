import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  monthlyConsumptionValue: number = 0;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.calculateMonthlyConsumptionValue();
      });
  }

  calculateMonthlyConsumptionValue(): void {
    this.monthlyConsumptionValue = this.employees.reduce((total, employee) => {
      return total + employee.monthlyConsumptionValue;
    }, 0);
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(() => {
      this.getEmployees();
    });
  }
}