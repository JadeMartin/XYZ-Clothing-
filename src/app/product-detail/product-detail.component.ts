import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  checkForProduct(products, target) {
    products.forEach(product => {
      if(product.id == target) {
        this.product = product;
        
      } 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product = this.productService.getProducts().subscribe(products => this.checkForProduct(products, +params.get('id')))
    });
  }

}
