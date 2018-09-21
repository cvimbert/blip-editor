import { Component, OnInit } from '@angular/core';
import {BlocksService} from "../blocks.service";
import {BankItemInterface} from "../bank-item.interface";
import {blocksDictionary} from "../../../syntax/syntax";

@Component({
    selector: 'virtual-code-keyboard',
    templateUrl: './virtual-code-keyboard.component.html',
    styleUrls: ['./virtual-code-keyboard.component.scss']
})
export class VirtualCodeKeyboardComponent implements OnInit {

    bankItems: BankItemInterface[] = [];

    constructor(
        private blocksService: BlocksService
    ) {
        for (let key in blocksDictionary) {
            this.bankItems.push(
                {
                    type: key,
                    class: blocksDictionary[key].itemClass
                }
            )
        }
    }

    ngOnInit() {

    }

}
