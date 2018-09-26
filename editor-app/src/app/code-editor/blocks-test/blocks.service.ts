import { Injectable } from '@angular/core';
import {BankItemInterface} from "./bank-item.interface";
import {DropBankComponent} from "./drop-banks/drop-bank/drop-bank.component";
import {BlockData} from "./block-data.class";
import {Observable} from "rxjs/Observable";
import {MatDialog} from "@angular/material";
import {BasicValueModalComponent} from "./basic-value-modal/basic-value-modal.component";
import {Definition} from "../../block-definitions/definition.interface";
import {definitions} from "../../block-definitions/definitions";
import {Leave} from "../../block-definitions/leave.interface";
import {blocksDictionary, nodesDictionary} from "../../syntax/syntax";
import {BlockDefinition} from "../../syntax/block-definition.interface";
import {SyntaxDeclaration} from "../../syntax/syntax-declaration.class";
import {SyntaxNode} from "../../syntax/syntax-node.interface";
import {SyntaxCheckCompleteResult} from "../../syntax/syntax-check-complete-result.interface";
import {BlockItemComponent} from "./block-item/block-item.component";
import {DataConsolidator} from "../../syntax/data-consolidator.class";
import {BlockDataUnit} from "../../syntax/block-data-unit.interface";
import {BlocksLine} from "../../syntax/blocks-line.class";

@Injectable()
export class BlocksService {

    syntaxDeclaration: SyntaxDeclaration;
    consolidator: DataConsolidator;

    bankItemsByName: {[key: string]: BankItemInterface} = {};
    dropBanks: DropBankComponent[] = [];
    dropBanksByName: {[key: string]: DropBankComponent} = {};

    // TODO: regrouper ces deux objets dans un seul
    dropped: {[key: string]: BlockDataUnit[]} = {};
    linesConsolidated: {[key: string]: BlocksLine[]} = {};
    droppedComponent: {[key: string]: BlockItemComponent[]} = {};

    typesByName: {[key: string]: string} = {};

    currentBankType: string;
    currentBankName: string;

    constructor(
        private dialog: MatDialog
    ) {
        this.syntaxDeclaration = new SyntaxDeclaration([nodesDictionary], blocksDictionary);

        let blocksData: string = localStorage.getItem("blocks");

        if (blocksData) {
            this.dropped = JSON.parse(blocksData);
        }

        this.consolidator = new DataConsolidator(this.syntaxDeclaration);
    }

    registerDropBank(component: DropBankComponent) {
        this.dropBanks.push(component);
        this.dropBanksByName[component.name] = component;

        if (!this.dropped[component.name]) {
            this.dropped[component.name] = [];
        } else {

            setTimeout(() => {
                this.droppedComponent[component.name] = component.blockItems.toArray();
            });
        }

        this.linesConsolidated[component.name] = [];
        this.droppedComponent[component.name] = [];

        this.verifySyntax(component.name, component.type);
    }

    updateBank(bankName: string) {
        this.dropBanksByName[bankName].update();
    }

    registerDropAction(bankName: string, blockName: string, bankType: string) {

        // TODO: à supprimer
        const bankItemDefinition: BlockDefinition = blocksDictionary[blockName];

        const item: BlockDataUnit = {
            type: blockName,
            value: bankItemDefinition.value
        };

        // console.log(bankItemDefinition);

        if (bankItemDefinition.valueProvider) {

            // todo: ne devrait pas se trouver ici, fonctionnement spécifique à Angular
            this.dialog.open(BasicValueModalComponent, {
                data: {
                    type: bankItemDefinition.valueProvider
                },
                width: "500px"
            }).beforeClose().subscribe((value: number) => {
                if (value) {
                    item.value = value;
                    this.validateAndVerify(bankName, bankType);
                }
            });

        } else {
            this.validateAndVerify(bankName, bankType);
        }

        this.dropped[bankName].push(item);
    }

    private validateAndVerify(bankName: string, bankType: string) {
        // obligé de déférer pour récupérer la liste de composants
        // on peut peut-être faire autrement

        setTimeout(() => {
            this.verifySyntax(bankName, bankType);
            this.updateBank(bankName);
        });
    }

    verifySyntax(bankName: string, bankType: string) {
        const res: SyntaxCheckCompleteResult = this.syntaxDeclaration.parseWithErrorManagement(this.dropped[bankName], bankType);
        this.dropBanksByName[bankName].isValid = !!res.result;

        console.log("RRR", res);

        if (res.result) {
            this.dropBanksByName[bankName].onResult.emit(res.result);
        }

        if (res.error) {
            this.dropBanksByName[bankName].onError.emit(res.error);
        }

        this.linesConsolidated[bankName] = this.consolidator.getConsolidatedAndLinedData(this.dropped[bankName], res.error);

        setTimeout(() => {
            this.droppedComponent[bankName] = this.dropBanksByName[bankName].blockItems.toArray();
        });
    }

    moveBlockToIndex(from: number, to: number, bankName: string, bankType: string) {
        if (from !== to) {
            const list: BlockDataUnit[] = this.dropped[bankName];
            const moved: BlockDataUnit = list.splice(from, 1)[0];

            list.splice(to - ((to > from) ? 1: 0), 0, moved);
        }

        this.verifySyntax(bankName, bankType);
    }

    moveBlockAtLastPosition(index: number, bankName: string, bankType: string) {
        this.moveBlockToIndex(index, this.dropped[bankName].length, bankName, bankType);
    }

    removeBlockAtIndex(index: number, bankName: string, bankType: string) {
        this.dropped[bankName].splice(index, 1);
        this.verifySyntax(bankName, bankType);
    }

    save() {
        localStorage.setItem("blocks", JSON.stringify(this.dropped));
    }

    clear() {
        localStorage.removeItem("blocks");

        for (let key in this.dropped) {
            this.dropped[key] = [];
        }

        for (let key in this.droppedComponent) {
            this.droppedComponent[key] = [];
        }

        this.dropBanks.forEach(bank => bank.isValid = false);
    }

}
