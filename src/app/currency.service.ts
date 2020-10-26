import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Currency } from './models/currency';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
//Uses Observer pattern for sending data into components
//Allows for code to be more extendable and useful if further developed
//This pattern allows for the server to more accurately replicate a backend
//Allows for async code, and easy switching to an actual server in the future.
export class CurrencyService {
  
  private currentCurrency: Currency;
  private currencyList: Currency[];

  constructor(private http: HttpClient) { }

  setCurrency(currency: Currency) {
    this.currentCurrency = currency;
  }

  getCurrency(): Observable<Currency> {
    return of(this.currentCurrency);
  }

  //function to take a product
  //then see if it needs price adjusting
  //if it does it finds the currency rate needed to calculate the new price
  //sets it in a new property called adjAmount
  //Using a new property to keep prices constant
  currencyConversion(product): Product {
    if(product.price.base != this.currentCurrency.base) {
      product.price.adjAmount = this.currencyList.find(currency => currency.base == product.price.base).rates[this.currentCurrency.base] * product.price.amount;
    } else {
      product.price.adjAmount = product.price.amount;
    }
    return product;
  }

  //private helper function for setting up currency data
  private processCurrencys(currencys): void {
    this.currencyList = currencys;
    this.currentCurrency = currencys[0];
  }

  getCurrencys(): Observable<any> {
    if(!this.currencyList){
      this.http.get('/assets/exchange_rates.json').subscribe(currencys => this.processCurrencys(currencys));
    }
    return this.http.get('/assets/exchange_rates.json');
  }
}
