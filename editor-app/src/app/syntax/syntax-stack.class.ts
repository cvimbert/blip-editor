import {SyntaxNode} from "./syntax-node.interface";

export class SyntaxStack {

    stack: SyntaxNode[] = [];

    pushNode(node: SyntaxNode, at: number) {
        this.stack[at] = node;
    }
}