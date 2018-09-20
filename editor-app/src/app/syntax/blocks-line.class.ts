import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";

export class BlocksLine {

    blocks: ConsolidatedBlockDataUnit[] = [];
    identation: number = 0;

    constructor() {}

    pushBlock(block: ConsolidatedBlockDataUnit) {
        this.blocks.push(block);
    }
}