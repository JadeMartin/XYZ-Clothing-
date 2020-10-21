import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { HttpClient } from "@angular/common/http";
import { defaultCipherList } from 'constants';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { map } from 'rxjs/operators'




@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get('/assets/products.json');
  }
}
