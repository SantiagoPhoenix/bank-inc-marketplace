import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryDetailRoutingModule } from './category-detail-routing.module';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';


@NgModule({
  declarations: [
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    CategoryDetailRoutingModule,
    SharedComponentModule
  ]
})
export class CategoryDetailModule { }
