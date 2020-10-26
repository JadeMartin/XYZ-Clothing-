import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CurrencyService } from './currency.service';
import { Observable, of } from 'rxjs';
import { Product } from './models/product';



@Injectable({
  providedIn: 'root',
})
//Uses observer pattern for sending data into components
//Allows for code to be more extendable and useful if further developed
//This pattern allows for the server to more accurately replicate a backend
//Allows for async code, and easy switching to an actual server in the future.
export class ProductService {

  private products;

  constructor(private http: HttpClient, private currencyService: CurrencyService) { }

  getSingleProduct(productId:number): Observable<Product>{
    return of(this.products.find(product => product.id == productId));
  }

  //Returns all products that are related to the project Id supplied
  getRelatedProducts(productId:number): Observable<Product[]>{
    let relatedProducts = [];
    let currentProduct = this.products.find(product => product.id == productId);
    if(currentProduct){
      currentProduct.relatedProducts.forEach(id => { //loop over related products list
        relatedProducts.push(this.products.find(product => product.id == id)); //find each product then add to return list
      })
    }
    return of(relatedProducts);
  }

  updateProduct(orginalId, updatedProduct): void {
    let index = this.products.findIndex(product => product.id == orginalId);
    this.products[index] = updatedProduct;
    //TODO: Name - must be longer than 3 characters
    if (orginalId != updatedProduct.id) {
      this.products.forEach(product => {
        product.relatedProducts.forEach(relatedId => {
          if(relatedId == orginalId){
            product.relatedProducts.push(updatedProduct.id);
            product.relatedProducts.splice(product.relatedProducts.indexOf(relatedId), 1);
            relatedId = updatedProduct.id;
          }
        })
      })
    }
  }

  getProducts(): Observable<any> {
    if(this.products){
      return of(this.standardizeCurrency(this.products));
    } else {
      this.http.get('/assets/products.json').subscribe(products => this.products = this.standardizeCurrency(products));
      return this.http.get('/assets/products.json');
    }
  }

  //helper function to iterate through each product and 
  //call the currency conversion method found in the currency service
  private standardizeCurrency(productList=this.products): Product[] {
    productList.forEach(product => {
      this.currencyService.currencyConversion(product);
    });
    return productList;
  }
}
