import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedComponentModule } from 'src/app/components/shared-component.module';


@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    SharedComponentModule
  ]
})
export class ProductDetailModule { }
