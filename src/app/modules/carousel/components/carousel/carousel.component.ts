import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { API_ROUTERS } from 'src/app/shared/const/ApiRouters';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';
import { IProduct } from 'src/app/shared/interfaces/iproduct';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{
  listImgs: Array<IProduct> = []
  @Input() buttons: boolean = true;
  WRDS = WORDS_CONST;
  slideInterval: number = 6000;
  selectedIndex: number = 0;
  offset: number = 0;
  amountElements: number = 15;
  intervalImg: number = 0;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.autoSlideImg();
    this.getProducts();
  }

  /**
   * Method that change the index of the image
   * @param index -> Number of the index that the user want to change
   */

  selectImg(index: number): void {
    this.selectedIndex = index;
  }

  /**
   * Method that open an interval of time to change the image inside the carousel
   */

  autoSlideImg(): void {
    setInterval(() => {
      this.nextImg();
    }, this.slideInterval)
  }

  /**
   * Method that change the next or previous image inside the carousel.
   * Also, change the index about the img array inside the carousel
   */

  nextImg(): void {
    if(this.selectedIndex === this.listImgs.length - 1){
      if(this.intervalImg < 2) this.intervalImg++;
      if(this.intervalImg === 2) this.intervalImg = 0;
      this.selectedIndex = 0;
    } {
      this.selectedIndex++;
    }
  }

  /**
   * Method that gets 15 products by page
   */

  getProducts(): void {
    const params = `?offset=${this.offset}&limit=${this.amountElements}`
    this.apiService.getInfo(API_ROUTERS.GET_V1_PRODUCT + params).pipe(take(1)).subscribe({
      next: (resp: any) => {
        this.listImgs = resp;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
