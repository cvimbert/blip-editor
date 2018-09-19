import {Component, Input, OnInit} from '@angular/core';
import {SyntaxCheckResult} from "../../../../syntax/syntax-check-result.class";
import {NumericValueDefinition} from "../../../../syntax/definitions/numeric-value-definition.class";

@Component({
    selector: 'numeric-value-drop-bank',
    templateUrl: './numeric-value-drop-bank.component.html',
    styleUrls: ['./numeric-value-drop-bank.component.scss']
})
export class NumericValueDropBankComponent implements OnInit {

    @Input("type") type: string;
    @Input("name") name: string;

    value: string;

    constructor() { }

    ngOnInit() {
    }

    hasResult(res: SyntaxCheckResult[]) {
      const numericValueDefinition: NumericValueDefinition = res[0].resultDefinitionObject;
      this.value = res ? String(numericValueDefinition.value) : "";
    }
}
