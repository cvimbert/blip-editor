import {SyntaxNode} from "./syntax-node.interface";

export interface SyntaxCheckErrorUnit {
    key: string;
    index: number;
    node: SyntaxNode;
}