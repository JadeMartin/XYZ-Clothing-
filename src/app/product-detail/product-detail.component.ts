import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { ProductService } from '../product.service';
import { isObservable, Observable } from "rxjs";
import { Product } from '../models/product';
import { Currency } from '../models/currency';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  relatedProducts: Observable<any>;
  selectedCurrency;
  currencyList: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private currencyService: CurrencyService,
  ) { }


  processInit(productId): void {
    this.relatedProducts = this.productService.getRelatedProducts(productId);
    this.productService.getSingleProduct(productId).subscribe(product => this.product = product);
    this.selectedCurrency = this.currencyService.getCurrency();
  }

  selected(): void {
    this.currencyService.setCurrency(this.selectedCurrency);
    //call function to swap prices as needed
    this.productService.getProducts();
  }
  
  //lifecycle hook to monitor the selectedCurrency
  ngDoCheck(): void	{
    if(isObservable(this.selectedCurrency)) {
      this.selectedCurrency.subscribe(currency => this.selectedCurrency = currency);
    }
  }

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrencys()
    this.route.paramMap.subscribe(params => {
      this.productService.getProducts().subscribe(products => this.processInit(+params.get('id')))
    });
    this.currencyService.getCurrencys().subscribe(currency => this.currencyService.getCurrency().subscribe(currency => this.selectedCurrency = currency));
  }

}
