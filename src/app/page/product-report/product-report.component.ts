import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.css']
})
export class ProductReportComponent implements OnInit {

  products: any[] = [];
  selectedMonth: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getProductReport() {
    this.http.get(`api/products?month=${this.selectedMonth}`).subscribe(data => {
      this.products = data;
    });
  }

}
