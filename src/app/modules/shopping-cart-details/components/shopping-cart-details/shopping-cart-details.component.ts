import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';
import { StorageService } from 'src/app/services/storage.service';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { IProductCart } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.scss']
})
export class ShoppingCartDetailsComponent implements OnInit {
  WRDS = WORDS_CONST;
  listProducts: Array<IProductCart> = []

  constructor(private store: StorageService, private router: Router, private apiService: ApiService, private fileService: FileService) {}

  ngOnInit(): void {
    this.activeShoppingCartEvent();
  }

  /**
   * Method that deletes one product if the amount greather 1
   * @param id -> Product id to delete
   */

  deleteOneProduct(id: number): void {
    this.store.deleteOneProduct(id);
  }

  /**
   * Method that deletes the product
   * @param id -> Product id to delete
   */

  deleteProduct(id: number): void {
    this.store.deleteProduct(id);
  }

  /**
   * Method that deletes all products inside the shopping cart and table
   */

  deleteAllProducts(): void {
    this.store.deleteAllProducts();
  }

  /**
   * Method that goes to product details module
   * @param idProduct -> Product id to search
   */

  goToProdDetails(idProduct: number): void {
    this.router.navigate(['/product-details/details/', idProduct]);
  }

  /**
   * Method that active a rxjs global event to listen the changes in the products
   */

  activeShoppingCartEvent(): void {
    this.store.getProducts().subscribe({
      next: (products) => {
        this.listProducts = products;
      },
      error: (err) => console.error(err)
    })
  }

  /**
   * Method that gets the file xlsx with the products inside the cart
   */
  getFile(): void {
    this.fileService.generateExcel(this.listProducts);
  }

}
