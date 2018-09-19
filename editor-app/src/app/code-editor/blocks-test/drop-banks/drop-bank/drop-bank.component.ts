import {
    Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild,
    ViewChildren
} from '@angular/core';
import {BlocksService} from "../../blocks.service";
import {BlockData} from "../../block-data.class";
import {BlockItemComponent} from "../../block-item/block-item.component";
import {SyntaxCheckError} from "../../../../syntax/syntax-check-error.class";
import {SyntaxCheckResult} from "../../../../syntax/syntax-check-result.class";

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

    constructor(
        private blocksService: BlocksService
    ) { }

    ngOnInit() {
        this.blocksService.registerDropBank(this);
    }

    get data(): BlockData[] {
        return this.blocksService.dropped[this.name];
    }

    addBlock() {

    }

    clear() {
        this.blocksService.dropped[this.name] = [];
    }

    ngOnDestroy() {

    }
}
