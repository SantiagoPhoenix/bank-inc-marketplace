import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'shopping-cart', loadChildren: () => import('src/app/modules/shopping-cart-details/shopping-cart-details.module').then((module) => module.ShoppingCartDetailsModule)},
  { path: 'product-details', loadChildren: () => import('src/app/modules/product-detail/product-detail.module').then((module) => module.ProductDetailModule)},
  { path: 'category-details', loadChildren: () => import('src/app/modules/category-detail/category-detail.module').then((module) => module.CategoryDetailModule)},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
