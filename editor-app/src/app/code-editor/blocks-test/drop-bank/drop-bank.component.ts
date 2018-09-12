import {Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BlocksService} from "../blocks.service";
import {BlockData} from "../block-data.class";
import {BlockItemComponent} from "../block-item/block-item.component";

@Component({
    selector: 'app-drop-bank',
    templateUrl: './drop-bank.component.html',
    styleUrls: ['./drop-bank.component.scss']
})
export class DropBankComponent implements OnInit, OnDestroy {

    @Input("type") type: string;
    @Input("name") name: string;

    @ViewChild("dropbank") dropBank: ElementRef;
    @ViewChildren("blockitem") blockItems: QueryList<BlockItemComponent>;

    data: BlockData[] = [];
    isValid: boolean = false;

    constructor(
        private blocksService: BlocksService
    ) { }

    ngOnInit() {
        this.data = this.blocksService.registerDropBank(this);
    }

    addBlock() {

    }

    ngOnDestroy() {

    }
}
