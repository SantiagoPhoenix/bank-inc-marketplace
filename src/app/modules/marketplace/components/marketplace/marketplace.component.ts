import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { API_ROUTERS } from 'src/app/shared/const/ApiRouters';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { ICategory } from 'src/app/shared/interfaces/icategory';
import { HelpersService } from 'src/app/services/helpers.service';
import { IProduct, IProductCart } from 'src/app/shared/interfaces/iproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  WRDS = WORDS_CONST;
  formFilter!: FormGroup;
  marketPlace: any = {
    categories: [],
    products: []
  }
  validateFilterRegx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z0-9]{8,20}$/;
  currentPage: number = 0;
  amountElements: number = 20;
  offset: number = 0;

  constructor(private store: StorageService, private apiService: ApiService, private helpersService: HelpersService,private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.createForm();
    this.activeFilter();
    this.getCategories();
    this.getProducts();
  }

  /**
   * Method that creates the form
   */

  createForm(): void {
    this.formFilter = this.formBuilder.group({
      name: [null]
    })
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

  goToCateDetails(idCategory: number): void {
    this.router.navigate(['/category-details/category/', idCategory]);
  }

  /**
   * Method to go to product details
   * @param idProduct -> Product id
   */

  goToProdDetails(idProduct: number): void {
    this.router.navigate(['/product-details/details/', idProduct]);
  }

  /**
   *Method that changes the current page of the pagination for the previous page and consults the services
   */

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.offset = this.currentPage;
    }
    this.getProducts();
  }

  /**
   * Method that changes the page of the pagination for the next page and consults the services
   * @param next -> active if the page is clicked for the user
   * @param page -> number -> Default 0. Its the index page to change in the menu
   */

  goToNextPage(next: boolean, page = 0) {
    if(page <= 3 && !next) {
      this.offset = page;
      this.currentPage = page;
    }
    if(next){
      this.currentPage++;
      this.offset = this.currentPage;
    }
    this.getProducts(false);
  }

  /**
   * Method that actives the filter for the filter input.
   * The method validates if the string has more of three characters
   */

  activeFilter(): void {
    this.helpersService.filterTable(this.formFilter, 'name').subscribe({
      next: (resp: any) => {
        this.offset = 0;
        if(resp.length > 0)this.getProducts(true);
        if(!resp) this.getProducts(false);
      },
      error: (err) => console.error(err)
    })
  }

  /**
   * Method that gets the categories list for the page
   */

  getCategories(): void {
    this.apiService.getInfo(API_ROUTERS.GET_CATEGORIES).pipe(take(1)).subscribe({
      next: (resp: Array<ICategory>) => {
        this.marketPlace.categories = resp;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  /**
   * Method that gets the products list for the page
   * @param isFilter -> boolean -> Argument that decides if the consult is by page or by title
   */

  getProducts(isFilter = false): void {
    const param = isFilter ? `/?title=${this.formFilter.value.name}` : `?offset=${this.offset}&limit=${this.amountElements}`;
    this.apiService.getInfo(API_ROUTERS.GET_V1_PRODUCT + param).pipe(take(1)).subscribe({
      next: (resp: Array<IProduct>) => {
        this.marketPlace.products = resp;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
