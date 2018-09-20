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
import {baseDictionary, blocksDictionary, nodesDictionary} from "../../syntax/syntax";
import {BlockDefinition} from "../../syntax/block-definition.interface";
import {SyntaxDeclaration} from "../../syntax/syntax-declaration.class";
import {SyntaxNode} from "../../syntax/syntax-node.interface";
import {SyntaxCheckCompleteResult} from "../../syntax/syntax-check-complete-result.interface";
import {BlockItemComponent} from "./block-item/block-item.component";
import {DataConsolidator} from "../../syntax/data-consolidator.class";
import {BlockDataUnit} from "../../syntax/block-data-unit.interface";
import {ConsolidatedBlockDataUnit} from "../../syntax/consolidated-block-data-unit.class";

@Injectable()
export class BlocksService {

    bankItemsByName: {[key: string]: BankItemInterface} = {};
    dropBanks: DropBankComponent[] = [];
    dropBanksByName: {[key: string]: DropBankComponent} = {};

    consolidator: DataConsolidator;

    // TODO: regrouper ces deux objets dans un seul
    dropped: {[key: string]: BlockDataUnit[]} = {};
    consolidated: {[key: string]: ConsolidatedBlockDataUnit[]} = {};
    droppedComponent: {[key: string]: BlockItemComponent[]} = {};

    syntaxDeclaration: SyntaxDeclaration;

    constructor(
        private dialog: MatDialog
    ) {
        this.syntaxDeclaration = new SyntaxDeclaration([baseDictionary, nodesDictionary], blocksDictionary);

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

        this.consolidated[component.name] = [];
        this.droppedComponent[component.name] = [];

        this.verifySyntax(component.name, component.type);
    }

    registerDropAction(bankName: string, blockName: string, bankType: string) {

        // TODO: à supprimer
        const bankItemDefinition: BlockDefinition = blocksDictionary[blockName];

        // va remplacer item
        const item2: BlockDataUnit = {
            type: blockName,
            value: bankItemDefinition.value
        };

        // console.log(bankItemDefinition);

        if (bankItemDefinition.valueProvider) {

            // todo: ne devrait pas se trouver ici
            this.dialog.open(BasicValueModalComponent, {
                data: {
                    type: bankItemDefinition.valueProvider
                },
                width: "500px"
            }).beforeClose().subscribe((value: number) => {
                if (value) {
                    item2.value = value;
                    this.validateAndVerify(bankName, bankType);
                }
            });

        } else {
            this.validateAndVerify(bankName, bankType);
        }

        this.dropped[bankName].push(item2);
    }

    private validateAndVerify(bankName: string, bankType: string) {
        // obligé de déférer pour récupérer la liste de composants
        // on peut peut-être faire autrement
        setTimeout(() => {
            this.droppedComponent[bankName] = this.dropBanksByName[bankName].blockItems.toArray();
            this.verifySyntax(bankName, bankType);
        });
    }

    verifySyntax(bankName: string, bankType: string) {
        const res: SyntaxCheckCompleteResult = this.syntaxDeclaration.parseWithErrorManagement(this.dropped[bankName], bankType);
        this.dropBanksByName[bankName].isValid = !!res.result;

        if (res.result) {
            this.dropBanksByName[bankName].onResult.emit(res.result);
        }

        if (res.error) {
            this.dropBanksByName[bankName].onError.emit(res.error);
        }

        // tout ça devrait pouvoir être déporté dans une fonction de consolidation des données
        // reset errors

        /*if (!res.result && Object.keys(res.error).length > 0) {
            if (res.error.end > -1) {
                this.dropped[bankName][res.error.end].errorAfter = true;
                this.dropped[bankName][res.error.end].errorText = res.error.errorText;
            } else {
                this.dropped[bankName][0].errorBefore = true;
                this.dropped[bankName][0].errorText = res.error.errorText
            }

            this.dropped[bankName].slice(res.error.end + 1, this.dropped[bankName].length).forEach(data => data.inactive = true);
        }*/

        this.consolidated[bankName] = this.consolidator.getConsolidatedData(this.dropped[bankName], Object.keys(res.error).length > 0 ? res.error : null);
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

    openValueModal(type: string): Observable<any> {
        return this.dialog.open(BasicValueModalComponent, {
            width: "500px",
            data: this.bankItemsByName[type]
        }).beforeClose();
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
