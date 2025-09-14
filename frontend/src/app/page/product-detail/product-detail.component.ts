import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [''],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductDetailComponent implements OnInit {

  goBack(): void {
    this.location.back();
  }


  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

}