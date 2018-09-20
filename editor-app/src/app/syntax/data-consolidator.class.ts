import {BlockDataUnit} from "./block-data-unit.interface";
import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";
import {SyntaxDeclaration} from "./syntax-declaration.class";
import {SyntaxCheckError} from "./syntax-check-error.class";
import {BlocksLine} from "./blocks-line.class";

export class DataConsolidator {

    constructor(
        private syntax: SyntaxDeclaration
    ) {}

    getConsolidatedData(data: BlockDataUnit[], error: SyntaxCheckError): ConsolidatedBlockDataUnit[] {

        const consolidated: ConsolidatedBlockDataUnit[] = data.map(unit => new ConsolidatedBlockDataUnit(this.syntax, unit));

        if (error && consolidated && consolidated.length > 0) {
            if (error.end > -1) {
                consolidated[error.end].errorAfter = true;
            } else {
                consolidated[0].errorBefore = true;
            }
        }

        return consolidated;
    }

    getConsolidatedAndLinedData(data: BlockDataUnit[], error: SyntaxCheckError): BlocksLine[] {

        const lines: BlocksLine[] = [];
        const consolidated: ConsolidatedBlockDataUnit[] = this.getConsolidatedData(data, error);

        let currentLine: BlocksLine = new BlocksLine();
        lines.push(currentLine);

        consolidated.forEach(item => {
            currentLine.pushBlock(item);
            if (item.lineJump) {
                currentLine = new BlocksLine();
                lines.push(currentLine);
            }
        });

        return lines;
    }
}