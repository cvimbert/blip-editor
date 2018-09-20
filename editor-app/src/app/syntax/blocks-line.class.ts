import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";

export class BlocksLine {

    blocks: ConsolidatedBlockDataUnit[] = [];

    constructor() {}

    pushBlock(block: ConsolidatedBlockDataUnit) {
        this.blocks.push(block);
    }
}