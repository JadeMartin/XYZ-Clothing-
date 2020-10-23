import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CurrencyService } from './currency.service';




@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products;
  currencyList;
  constructor(private http: HttpClient, private currencyService: CurrencyService) { }

  setProducts(products) {
    this.products = products;
  }

  getProducts() {
    //this.products ? this.products : 
    this.http.get('/assets/products.json').subscribe(products => this.products = products);
    return this.http.get('/assets/products.json')
  }


  standardizeCurrency(currency, productList=this.products) {
    //-> take new currency & list of currencys
    //->iterate over each product check product base against currency base
    //-> if same set adjAmount to amount
    //-> else -> set adjAmount to Math.round(this.currencyList.find(currency => currency.base == product.price.base).rates[currency.base] * product.price.amount)
    
    if(!this.currencyList){
      this.currencyList = this.currencyService.currencyList;
    }
    
    productList.forEach(product => {
      if(product.price.base != currency.base) {
        product.price.adjAmount = this.currencyList.find(currency => currency.base == product.price.base).rates[currency.base] * product.price.amount;
      } else {
        product.price.adjAmount = product.price.amount;
      }
    });
    return productList;
  }
}
