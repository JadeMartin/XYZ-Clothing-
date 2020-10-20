import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productA: Product = {
    id: 1,
    name: "ProductA",
    description: "Product A Description",
    price: {
      base: "USD",
      amount: 10,
    },
    relatedProducts: []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
