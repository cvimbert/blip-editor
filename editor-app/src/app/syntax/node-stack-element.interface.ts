import {SyntaxNode} from "./syntax-node.interface";

export interface NodeStackElementInterface {
    index: number;
    node: SyntaxNode;
}