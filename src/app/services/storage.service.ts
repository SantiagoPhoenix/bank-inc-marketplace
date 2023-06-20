import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IProductCart } from '../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private shoppingCart$ = new BehaviorSubject<any>([]);

  /**
   * Validates if there're products inside the localStorage and set these
   */

  constructor() {
    let productsStorage = localStorage.getItem('products');
    if(productsStorage) {
      this.shoppingCart$.next(JSON.parse(productsStorage));
    }
  }

  /**
   * Method that creates the products observable
   * @returns shoppingCart$ -> Observable for products
   */

  getProducts(): Observable<any> {
    return this.shoppingCart$.asObservable();
  }

  /**
   *Method that sets the products inside the observable and the localStorage
   * @param products -> Products list
   */

  private setProducts(products: Array<IProductCart>): void {
    this.shoppingCart$.next([...products]);
    localStorage.setItem('products', JSON.stringify(products));
  }

  /**
   *Method that validates if the product exist or not and sets the products
   * @param product -> Product to set
   */

  addProduct(product: IProductCart): void {
    let productList: Array<IProductCart> = this.shoppingCart$.getValue();
    let prod = productList.find(e => e.id === product.id);
    if(prod){
      prod.amount += 1;
      this.setProducts(productList);
    } else {
      productList.push(product);
      this.setProducts(productList);
    }
  }

  /**
   *Method that deletes one product of the list and validate if the amount of products greather 1
   * @param id -> Product id
   */

  deleteOneProduct(id: number): void {
    let productList: Array<IProductCart> = this.shoppingCart$.getValue();
    let prod = productList.find(e => e.id === id);
    prod!.amount -= 1;
    if(prod!.amount === 0) prod!.amount = 1;
    this.setProducts(productList);
  }

  /**
   *Method that deletes the product
   * @param id -> Product id
   */

  deleteProduct(id: number) {
    let productList: Array<IProductCart> = this.shoppingCart$.getValue().filter((e: IProductCart) => e.id !== id);
    this.setProducts(productList);
  }

  /**
   * Method that deletes all products
   */

  deleteAllProducts(): void {
    this.setProducts([]);
  }
}
