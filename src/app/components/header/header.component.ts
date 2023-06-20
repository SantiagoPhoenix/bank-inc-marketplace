import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { GLOBAL_CONST } from 'src/app/shared/const/GlobalConst';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { IProductCart } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  WRDS = WORDS_CONST;
  GBL = GLOBAL_CONST
  totalProducts: number = 0;

  /**
   * Method that plus the amount of products
   * @param list -> list of products
   * @returns number -> The total of products
   */

  private counterProducts = (list: Array<IProductCart> = []) => {
    let total = 0;
    if(list.length > 0){
      list.forEach((product: any) => {
        total += product.amount;
      })
    } else {
      total = 0;
    }
    return total;
  }

  constructor(private router: Router, private store: StorageService){}

  /**
   *Methot that active the rxjs state and count the products
   */

  ngOnInit(): void {
    this.store.getProducts().subscribe({
      next: (products: Array<IProductCart>) => {
        this.totalProducts = this.counterProducts(products);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }

  /**
   * Method that goes to the shopping cart module
   */

  goToShopDetails(): void {
    this.router.navigate(['shopping-cart']);
  }

  /**
   * Method that goes to main home
   */

  goToHome(): void {
    this.router.navigate(['']);
  }
}
