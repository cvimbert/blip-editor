import { Injectable } from '@angular/core';
import {BankItemInterface} from "./bank-item.interface";
import {DropBankComponent} from "./drop-bank/drop-bank.component";
import {BlockData} from "./block-data.class";
import {Observable} from "rxjs/Observable";
import {MatDialog} from "@angular/material";
import {BasicValueModalComponent} from "./basic-value-modal/basic-value-modal.component";
import {Definition} from "../../block-definitions/definition.interface";
import {definitions} from "../../block-definitions/definitions";
import {Leave} from "../../block-definitions/leave.interface";
import {blocksDictionary, nodesDictionary} from "../../syntax/syntax";
import {BlockDefinition} from "../../syntax/block-definition.interface";

@Injectable()
export class BlocksService {

    bankItemsByName: {[key: string]: BankItemInterface} = {};
    dropBanks: DropBankComponent[] = [];

    dropped: {[key: string]: BlockData[]} = {};

    constructor(
        private dialog: MatDialog
    ) { }

    registerDropBank(component: DropBankComponent): BlockData[] {
        this.dropBanks.push(component);
        this.dropped[component.name] = [];
        return this.dropped[component.name];
    }

    registerDropAction(bankName: string, blockName: string, bankType: string) {

        // TODO: à supprimer
        const bankItemDefinition: BlockDefinition = blocksDictionary[blockName];

        const item: BlockData = new BlockData({
            type: bankItemDefinition.type,
            text: bankItemDefinition.text
        });

        /*if (bankItemDefinition.valueProvider) {
            bankItemDefinition.valueProvider().subscribe((value: any) => {
                if (value !== undefined) {
                    item.value = value;

                    const textBuilder: Function | string = bankItemDefinition.textBuilder;

                    item.mainText = bankItemDefinition.textBuilder(value);
                    this.dropped[bankName].push(item);
                }
            });
        } else {*/
            // item.mainText = bankItemDefinition.type;
            this.dropped[bankName].push(item);
        //}

        this.verifySyntax(bankName, bankType);
    }

    verifySyntax(bankName: string, bankType: string): number {
        return;
    }

    openValueModal(type: string): Observable<any> {
        return this.dialog.open(BasicValueModalComponent, {
            width: "500px",
            data: this.bankItemsByName[type]
        }).beforeClose();
    }

}
