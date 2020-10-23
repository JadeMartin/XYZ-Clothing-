import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
  selectedCurrency;
  currencyList;
  currentCurrency;
  
  //private productService: ProductService
  constructor(private productService: ProductService,
    private currencyService: CurrencyService) { }


  selected(): void {
    this.currencyService.setCurrency(this.selectedCurrency);
    this.currentCurrency = this.selectedCurrency;
    //call function to flip prices on each object
    this.products = this.productService.standardizeCurrency(this.currentCurrency);
  }

  ngOnInit(): void {
    this.products = [];
    this.currencyList = this.currencyService.getCurrencys();
    this.currentCurrency = this.currencyService.getCurrency();
    this.productService.getProducts().subscribe(products => this.products = this.productService.standardizeCurrency(this.currentCurrency));
  }

}
