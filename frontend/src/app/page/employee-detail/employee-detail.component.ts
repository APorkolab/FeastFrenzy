import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(id)
      .subscribe(employee => {
        if (employee) {
          this.employee = employee;
        }
      });
  }



}