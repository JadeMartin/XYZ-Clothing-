import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Currency } from './models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currentCurrency:Currency = {
    base: 'AUD',
    rates: {
      USD: 0.72,
      CNY: 4.87
    }
  }
  currencyList;
  constructor(private http: HttpClient) { }

  setCurrency(currency) {
    this.currentCurrency = currency;
  }
  getCurrency() {
    return this.currentCurrency;
  }

  private processCurrencys(currencys) {
    this.currencyList = currencys;
    this.setCurrency(this.currencyList[0]);    
  }

  getCurrencys() {
    this.http.get('/assets/exchange_rates.json').subscribe(currencys => this.processCurrencys(currencys));
    return this.http.get('/assets/exchange_rates.json');
  }
}
