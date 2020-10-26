import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { Currency } from '../models/currency';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;
  selectedCurrency: Currency;
  currencyList: Observable<any>;
  
  constructor(private productService: ProductService,
    private currencyService: CurrencyService) { }


  selected(): void {
    this.currencyService.setCurrency(this.selectedCurrency);
    //call function to flip prices on each object
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrencys()
    this.productService.getProducts().subscribe(products => this.products = this.productService.getProducts());
    this.currencyService.getCurrencys().subscribe(currency => this.currencyService.getCurrency().subscribe(currency => this.selectedCurrency = currency));
  }

}
