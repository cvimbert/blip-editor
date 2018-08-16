import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BankItemInterface} from "../bank-item.interface";
import {BlocksService} from "../blocks.service";

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

    constructor(
        private blocksService: BlocksService
    ) {}

    ngOnInit() {

        let draggable = Draggable.create(this.content.nativeElement, {
            onDragEnd: () => {
                // on check si on touche une zone de drop
                for (let bank of this.blocksService.dropBanks) {
                    if (draggable.hitTest(bank.dropBank.nativeElement)) {
                        this.blocksService.registerDropAction(bank.name, this.data.type, bank.type);
                        break;
                    } else {
                        // pas dans une bank
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
        })[0];
    }

}
