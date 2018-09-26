import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BankItemInterface} from "../bank-item.interface";
import {BlocksService} from "../blocks.service";
import {blocksDictionary} from "../../../syntax/syntax";

declare var require: any;
const Draggable = require("gsap/Draggable");
const TweenLite = require("gsap/TweenLite");

@Component({
    selector: 'bank-item',
    templateUrl: './bank-item.component.html',
    styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent implements OnInit {

    @Input() data: BankItemInterface;
    @ViewChild("content") content: ElementRef;

    text: string;

    constructor(
        private blocksService: BlocksService
    ) {}

    ngOnInit() {

        // TODO: temporaire, à supprimer dès que possible
        this.text = blocksDictionary[this.data.type].text;

        /*let draggable = Draggable.create(this.content.nativeElement, {
            onDragEnd: () => {
                // on unitCheck si on touche une zone de drop
                for (let bank of this.blocksService.dropBanks) {
                    if (draggable.hitTest(bank.dropBank.nativeElement)) {
                        this.blocksService.registerDropAction(bank.name, this.data.type, bank.type);
                        break;
                    } else {
                        // pas dans une bank, on ne fait rien
                    }
                }

                TweenLite.set(this.content.nativeElement, {
                    css: {
                        x: 0,
                        y: 0
                    },
                    clearProps: "all"
                });
            }
        })[0];*/
    }

    useKey() {
        this.blocksService.useBankItem(this.blocksService.currentBankName, this.blocksService.currentBankType, this.data);
    }

}
