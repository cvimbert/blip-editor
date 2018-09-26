import {BlockDataUnit} from "./block-data-unit.interface";
import {SyntaxDeclaration} from "./syntax-declaration.class";
import {BlockDefinition} from "./block-definition.interface";
import {SyntaxCheckErrorUnit} from "./syntax-check-error-unit.interface";

export class ConsolidatedBlockDataUnit {

    text: string;
    class: string;
    lineJump: boolean = false;
    errorAfter: boolean = false;
    errorBefore: boolean = false;
    inactive: boolean = false;
    indentAfter: number;

    suggestions: SyntaxCheckErrorUnit[] = [];

    constructor(
        syntax: SyntaxDeclaration,
        private unit: BlockDataUnit
    ) {
        const definition: BlockDefinition = syntax.blocksDictionary[unit.type];

        if (definition.textProvider) {
            this.text = definition.textProvider(unit.value);
        } else {
            this.text = definition.text;
        }

        this.class = definition.itemClass;
        this.lineJump = definition.breakAfter;
        this.indentAfter = definition.indentAfter;
    }

    pushSuggestion(suggestion: SyntaxCheckErrorUnit) {
        this.suggestions.push(suggestion);
    }
}
