import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Purchase } from 'src/app/model/purchase';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styles: [''],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PurchaseReportComponent implements OnInit {
  purchases: Purchase[] = [];
  selectedMonth!: string;
  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getPurchaseReport() {
    this.http.get<Purchase[]>(`/purchases?month=${this.selectedMonth}`).subscribe(data => {
      this.purchases = data;
      this.purchases.sort((a, b) => b.total - a.total);
    });
  }
}