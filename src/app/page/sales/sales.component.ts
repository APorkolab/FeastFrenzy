import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

  sales = [
    { employee: 'John Doe', product: 'Computer', quantity: 1, price: 1000, date: '01/01/2022' },
    { employee: 'Jane Smith', product: 'Tablet', quantity: 3, price: 500, date: '01/02/2022' },
    { employee: 'Bob Johnson', product: 'Phone', quantity: 2, price: 600, date: '01/03/2022' },
  ];

  newSale = { employee: '', product: '', quantity: 0, price: 0, date: '' };

  addSale() {
    this.sales.push(this.newSale);
    this.newSale = { employee: '', product: '', quantity: 0, price: 0, date: '' };
  }

  editSale(sale) {
    // code to edit sale
  }

  deleteSale(sale) {
    // code to delete sale
  }
}