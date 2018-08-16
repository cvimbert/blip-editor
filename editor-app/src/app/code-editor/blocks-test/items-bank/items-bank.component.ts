import {Component, Input, OnInit} from '@angular/core';
import {BankItemInterface} from "../bank-item.interface";

@Component({
  selector: 'app-items-bank',
  templateUrl: './items-bank.component.html',
  styleUrls: ['./items-bank.component.scss']
})
export class ItemsBankComponent implements OnInit {

  @Input("items") items: BankItemInterface[];

  constructor() { }

  ngOnInit() {
  }

}
