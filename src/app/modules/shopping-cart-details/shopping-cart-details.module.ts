import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartDetailsRoutingModule } from './shopping-cart-details-routing.module';
import { ShoppingCartDetailsComponent } from './components/shopping-cart-details/shopping-cart-details.component';
import { SharedComponentModule } from 'src/app/components/shared-component.module';


@NgModule({
  declarations: [
    ShoppingCartDetailsComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartDetailsRoutingModule,
    SharedComponentModule
  ]
})
export class ShoppingCartDetailsModule { }
