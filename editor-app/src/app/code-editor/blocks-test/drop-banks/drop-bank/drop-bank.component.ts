import {
    Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {BlocksService} from "../../blocks.service";
import {BlockData} from "../../block-data.class";
import {BlockItemComponent} from "../../block-item/block-item.component";
import {SyntaxCheckError} from "../../../../syntax/syntax-check-error.class";
import {SyntaxCheckResult} from "../../../../syntax/syntax-check-result.class";
import {ConsolidatedBlockDataUnit} from "../../../../syntax/consolidated-block-data-unit.class";
import {BlocksLine} from "../../../../syntax/blocks-line.class";

@Component({
    selector: 'drop-bank',
    templateUrl: './drop-bank.component.html',
    styleUrls: ['./drop-bank.component.scss']
})
export class DropBankComponent implements OnInit, OnDestroy {

    @Input("type") type: string;
    @Input("name") name: string;

    @ViewChild("dropbank") dropBank: ElementRef;
    @ViewChildren("blockitem") blockItems: QueryList<BlockItemComponent>;

    @Output("onError") onError: EventEmitter<SyntaxCheckError> = new EventEmitter<SyntaxCheckError>();
    @Output("onResult") onResult: EventEmitter<SyntaxCheckResult[]> = new EventEmitter<SyntaxCheckResult[]>();

    isValid: boolean = false;
    private blocksCount: number;

    constructor(
        private blocksService: BlocksService
    ) { }

    ngOnInit() {
        this.blocksService.registerDropBank(this);
    }

    get data(): BlocksLine[] {
        this.blocksCount = 0;
        return this.blocksService.linesConsolidated[this.name];
    }

    get incrementedBlocksCount(): number {
        return this.blocksCount++;
    }

    addBlock() {

    }

    clear() {
        this.blocksService.dropped[this.name] = [];
    }

    ngOnDestroy() {

    }
}
