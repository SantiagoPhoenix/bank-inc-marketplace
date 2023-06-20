import { Component } from '@angular/core';
import { WORDS_CONST } from 'src/app/shared/const/WordsConst';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  WRDS = WORDS_CONST;
}
