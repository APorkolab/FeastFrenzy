import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  purchases: Purchase[] = [];
  newPurchase: Purchase = new Purchase();

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.getPurchases();
  }
  getPurchases() {
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
    });
  }

  addPurchase() {
    this.purchaseService.addPurchase(this.newPurchase).subscribe(() => {
      this.getPurchases();
      this.newPurchase = new Purchase();
    });
  }

  editPurchase(purchase: Purchase) {
    this.newPurchase = purchase;
  }

  deletePurchase(purchase: Purchase) {
    this.purchaseService.deletePurchase(purchase).subscribe(() => {
      this.getPurchases();
    });
  }
}