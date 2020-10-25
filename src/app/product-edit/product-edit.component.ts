import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { ProductService } from '../product.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product;
  products;
  currencyList;
  relatedProductsForm = new FormControl();
  currencyForm = new FormControl();
  editProductForm

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private currencyService: CurrencyService,
    private location: Location,
    private formBuilder: FormBuilder,
  ) { 
    this.editProductForm = this.formBuilder.group({
      name: "",
      id: "",
      description: "",
      price: "",
    })
  }

  onSubmit(productData){
    console.log("submitted");
    console.log(productData);
    console.log(this.currencyForm.value);
    console.log(this.relatedProductsForm.value)
  }
  

  processInit(productId) {
    this.productService.getRelatedProducts(productId).subscribe(relatedProducts => this.relatedProductsForm.setValue(relatedProducts));
    this.productService.getSingleProduct(productId).subscribe(product => this.product = product);
    this.currencyForm.setValue(this.product.price);
    this.editProductForm = this.formBuilder.group({
      name: this.product.name,
      id: this.product.id,
      description: this.product.description,
      price: this.product.price.amount,
    })
    this.productService.getProducts().subscribe(products => this.products = products.filter(product => product.id != this.product.id));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrencys()
    this.route.paramMap.subscribe(params => {
      this.productService.getProducts().subscribe(products => this.processInit(+params.get('id')))
    });
  }


}
