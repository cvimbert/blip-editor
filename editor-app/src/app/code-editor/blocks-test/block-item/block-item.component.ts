import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BlockData} from "../block-data.class";

@Component({
    selector: 'block-item',
    templateUrl: './block-item.component.html',
    styleUrls: ['./block-item.component.scss']
})
export class BlockItemComponent implements OnInit {

    @Input() data: BlockData;

    constructor() { }

    ngOnInit() {

    }

}
