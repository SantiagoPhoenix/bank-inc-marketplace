import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { API_ROUTERS } from 'src/app/shared/const/ApiRouters';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { IProduct, IProductCart } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  WRDS = WORDS_CONST;
  idProduct: number = 0;
  product!: IProduct;

  constructor(private store: StorageService, private activatedRoute: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {
    this.idProduct = Number(this.activatedRoute.snapshot.params['idProduct']);
    this.getProduct();
  }

  /**
   * Method that transform to add the product inside the shopping cart
   */

  addProduct(): void {
    let prod: IProductCart = {amount: 1, ...this.product};
    this.store.addProduct(prod);
  }

  /**
   * Method that gets the product list by product id
   */

  getProduct(): void {
    const param = `/${this.idProduct}`;
    this.apiService.getInfo(API_ROUTERS.GET_V1_PRODUCT + param).pipe(take(1)).subscribe({
      next: (resp: IProduct) => {
        this.product = resp;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }





}
