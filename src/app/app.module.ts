import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    TopBarComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
