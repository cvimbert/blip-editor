import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";
import {BlocksLineUnit} from "./blocks-line-unit.interface";
import {SyntaxCheckErrorUnit} from "./syntax-check-error-unit.interface";

export class BlocksLine {

    blocks: BlocksLineUnit[] = [];
    indentation: number = 0;

    constructor() {}

    pushBlock(block: ConsolidatedBlockDataUnit) {
        this.blocks.push({
            block: block
        });
    }

    pushSuggestion(suggestion: SyntaxCheckErrorUnit) {
        this.blocks.push({
            suggestion: suggestion
        });
    }
}