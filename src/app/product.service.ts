import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('/assets/products.json');
  }
}
