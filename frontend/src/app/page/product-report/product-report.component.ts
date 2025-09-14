import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styles: [''],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductReportComponent implements OnInit {

  products: Product[] = [];
  selectedMonth!: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  getProductReport(): void {
    this.http.get<Product[]>(`/products?month = ${this.selectedMonth}`).subscribe(data => {
      this.products = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}