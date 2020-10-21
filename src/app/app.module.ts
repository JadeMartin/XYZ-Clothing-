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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule
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
