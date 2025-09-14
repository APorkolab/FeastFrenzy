import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';


@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styles: [''],
  standalone: true,
  imports: [CommonModule, FormsModule]
})

export class PurchaseDetailComponent implements OnInit {

  purchase!: Purchase;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit() {
    this.getPurchase();
  }

  getPurchase(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.purchaseService.getPurchase(id).subscribe(purchase => this.purchase = purchase);
  }

}