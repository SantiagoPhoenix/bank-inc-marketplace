import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CarouselModule } from '../modules/carousel/carousel.module';
import { MarketplaceModule } from '../modules/marketplace/marketplace.module';



@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  exports: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    CarouselModule,
    MarketplaceModule
  ]
})
export class SharedComponentModule { }
