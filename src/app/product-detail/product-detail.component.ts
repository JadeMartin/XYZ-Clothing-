import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product;
  relatedProducts;
  selectedCurrency;
  currencyList;
  currentCurrency;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private currencyService: CurrencyService,
  ) { }

  checkForProduct(products, target) {
    products.forEach(product => {
      if(product.id == target) {
        this.product = product;
      } 
    });
    //add check for valid product;
    if(this.product) {
      this.relatedProducts = [];
      this.product.relatedProducts.forEach(productId => {
        this.relatedProducts.push(products.find(p => p.id ==productId));
      })
    }
  }

  selected(): void {
    this.currencyService.setCurrency(this.selectedCurrency);
    this.currentCurrency = this.selectedCurrency;
    //call function to flip prices on each object
    this.relatedProducts.push(this.product);
    this.relatedProducts = this.productService.standardizeCurrency(this.currentCurrency, this.relatedProducts);
    this.relatedProducts.pop();
  }

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrencys();
    this.currentCurrency = this.currencyService.getCurrency();
    this.route.paramMap.subscribe(params => {
      //logic to check wether to subscribe or not
      this.productService.getProducts().subscribe(products => this.checkForProduct(this.productService.standardizeCurrency(this.currentCurrency), +params.get('id')))
    });
  }

}
