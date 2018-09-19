import {SyntaxNode} from "./syntax-node.interface";

export class SyntaxCheckError {
    node: SyntaxNode;
    start: number;
    end: number;
    key: string;

    get errorText(): string {
        return "Pas d'erreur définie : " + this.key;
    }
}