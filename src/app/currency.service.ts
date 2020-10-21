import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currentBase = 'AUD';
  currentStandard =  {
    "USD": 0.72,
    "CNY": 4.87
  };
  constructor(private http: HttpClient) { }

  getCurrency() {
    return this.http.get('/assets/exchange_rates.json');
  }
}
