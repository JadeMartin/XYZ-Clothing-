import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products;
//private productService: ProductService
  constructor(private productService: ProductService) { }

  getProducts(): void {
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
