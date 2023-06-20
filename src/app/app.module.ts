import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentModule } from './components/shared-component.module';
import { ShoppingCartDetailsModule } from './modules/shopping-cart-details/shopping-cart-details.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryDetailModule } from './modules/category-detail/category-detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedComponentModule,
    HttpClientModule,
    ShoppingCartDetailsModule,
    ProductDetailModule,
    CategoryDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
