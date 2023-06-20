import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { StorageService } from 'src/app/services/storage.service';
import { API_ROUTERS } from 'src/app/shared/const/ApiRouters';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { IProduct, IProductCart } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  WRDS = WORDS_CONST;
  marketPlace: any = {
    products: []
  }
  categoryId: number = 0;
  currentPage: number = 0;
  amountElements: number = 20;
  offset: number = 0;

  constructor(private store: StorageService, private apiService: ApiService, private helpersService: HelpersService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.categoryId = Number(this.activatedRoute.snapshot.params['idCategory']);
    this.getProductsByCategory();
  }

    /**
   * Method that transform to add the product inside the shopping cart
   * @param product -> Item to add inside the local storage and the shopping
   */

  addProduct(product: IProduct): void {
    let prod: IProductCart = {amount: 1, ...product};
    this.store.addProduct(prod);
  }

  /**
   * Method to go to category details module
   * @param idCategory -> Category id
   */

  goToProdDetails(idCategory: number): void {
    this.router.navigate(['/category-details/category/', idCategory]);
  }

  /**
   * Method that gets the products by category id
   */

  getProductsByCategory(): void {
    const param = `/${this.categoryId}/products`
    this.apiService.getInfo(API_ROUTERS.GET_CATEGORIES + param).pipe(take(1)).subscribe({
      next: (resp: Array<IProduct>) => {
        this.marketPlace.products = resp;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
