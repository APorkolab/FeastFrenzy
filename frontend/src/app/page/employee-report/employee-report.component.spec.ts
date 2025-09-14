import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeReportComponent } from './employee-report.component';

describe('EmployeeReportComponent', () => {
  let component: EmployeeReportComponent;
  let fixture: ComponentFixture<EmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EmployeeReportComponent, HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
