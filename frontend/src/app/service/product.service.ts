import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = '/products';
  products: Product[] = [];
  selectedMonth!: string;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productUrl, product);
  }

  getProductReport(month: string) {
    this.http.get<Product[]>(`/products?month=${month}`).subscribe(data => {
      this.products = data;
    });
  }


  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
