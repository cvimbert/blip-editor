import {BlockDataUnit} from "./block-data-unit.interface";
import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";
import {SyntaxDeclaration} from "./syntax-declaration.class";
import {SyntaxCheckError} from "./syntax-check-error.class";
import {BlocksLine} from "./blocks-line.class";

export class DataConsolidator {

    constructor(
        private syntax: SyntaxDeclaration
    ) {}

    // TODO: attention : ne pas regénérer d'objet à chaque drop
    // complètement préjudiciable pour les performances

    getConsolidatedData(data: BlockDataUnit[], error: SyntaxCheckError): ConsolidatedBlockDataUnit[] {

        const consolidated: ConsolidatedBlockDataUnit[] = data.map(unit => new ConsolidatedBlockDataUnit(this.syntax, unit));

        if (error && consolidated && consolidated.length > 0) {

            error.parsingFailures.forEach(failure => consolidated[failure.index - 1].errorAfter = true);
            error.parsingOptions.forEach(option => consolidated[option.index - 1].pushSuggestion(option));

            /*if (error.end > -1) {
                consolidated[error.end].errorAfter = true;
            } else {
                consolidated[0].errorBefore = true;
            }*/
        }

        return consolidated;
    }

    getConsolidatedAndLinedData(data: BlockDataUnit[], error: SyntaxCheckError): BlocksLine[] {

        const lines: BlocksLine[] = [];
        const consolidated: ConsolidatedBlockDataUnit[] = this.getConsolidatedData(data, error);

        let indentation: number = 0;

        let currentLine: BlocksLine = new BlocksLine();
        lines.push(currentLine);

        consolidated.forEach(item => {

            // TODO: vérifier le fonctionnement de indentAfter (qui est à priori temporaire)

            if (item.indentAfter) {
                currentLine.indentation += Math.min(0, item.indentAfter);
            }

            if (item.lineJump && item.indentAfter) {
                indentation += item.indentAfter;
            }

            currentLine.pushBlock(item);
            if (item.lineJump) {
                currentLine = new BlocksLine();
                currentLine.indentation = indentation;
                lines.push(currentLine);
            }
        });

        return lines;
    }
}