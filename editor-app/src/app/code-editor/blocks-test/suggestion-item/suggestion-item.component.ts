import {Component, Input, OnInit} from '@angular/core';
import {SyntaxCheckErrorUnit} from "../../../syntax/syntax-check-error-unit.interface";

@Component({
    selector: 'suggestion-item',
    templateUrl: './suggestion-item.component.html',
    styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent implements OnInit {

    @Input("data") data: SyntaxCheckErrorUnit;

    constructor() { }

    ngOnInit() {
    }

}
