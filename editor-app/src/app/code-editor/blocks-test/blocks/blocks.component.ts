import { Component, OnInit } from '@angular/core';
import {BlockData} from "../block-data.class";
import {BlockDataInterface} from "../block-data.interface";
import {BankItemInterface} from "../bank-item.interface";
import {BlocksService} from "../blocks.service";
import {BasicTypes} from "../basic-types.class";
import {SyntaxDeclaration} from "../../../syntax/syntax-declaration.class";
import {
    baseDictionary, blocksDictionary, blocksSet1, ifTest,
    nodesDictionary
} from "../../../syntax/syntax";
import {SyntaxCheckResult} from "../../../syntax/syntax-check-result.class";

@Component({
    selector: 'app-blocks',
    templateUrl: './blocks.component.html',
    styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

    data: BlockDataInterface[];
    consolidatedData: BlockData[] = [];

    bankItems: BankItemInterface[] = [];

    constructor(
        private blocksService: BlocksService
    ) {

        const declaration: SyntaxDeclaration = new SyntaxDeclaration(
            [baseDictionary, nodesDictionary],
            blocksDictionary
        );

        let ifRes: SyntaxCheckResult[] = declaration.parse(ifTest, "If");
        console.log(ifRes);

        for (let key in blocksDictionary) {
            this.bankItems.push(
                {
                    type: key,
                    class: blocksDictionary[key].type
                }
            )
        }
    }

    ngOnInit() {
    }

}
