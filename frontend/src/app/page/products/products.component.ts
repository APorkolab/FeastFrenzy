import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [''],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  deleteProduct(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product.id).subscribe();
  }
}