import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  currencyList;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyList = this.currencyService.getCurrency();
  }

}
