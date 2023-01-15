import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../model/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchaseUrl = '/purchases';

  constructor(private http: HttpClient) { }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchaseUrl);
  }

  getPurchase(id: number): Observable<Purchase> {
    const url = `${this.purchaseUrl}/${id}`;
    return this.http.get<Purchase>(url);
  }

  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.purchaseUrl, purchase);
  }

  updatePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(this.purchaseUrl, purchase);
  }

  deletePurchase(purchase: Purchase | number): Observable<Purchase> {
    const id = typeof purchase === 'number' ? purchase : purchase.id;
    const url = `${this.purchaseUrl}/${id}`;
    return this.http.delete<Purchase>(url);
  }
}