import {SyntaxNode} from "./syntax-node.interface";
import {SyntaxCheckErrorUnit} from "./syntax-check-error-unit.interface";

export class SyntaxCheckError {
    node: SyntaxNode;
    start: number;
    end: number;
    key: string;

    parsingFailures: SyntaxCheckErrorUnit[] = [];
    parsingOptions: SyntaxCheckErrorUnit[] = [];

    get errorText(): string {
        return "Pas d'erreur définie : " + this.key;
    }

    pushFailure(key: string, atIndex: number) {
        this.parsingFailures.push({
            key: key,
            index: atIndex
        });
    }

    pushOption(key: string, atIndex: number) {
        this.parsingOptions.push({
            key: key,
            index: atIndex
        });
    }
}