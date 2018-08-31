import {BlockDefinition} from "./block-definition.interface";

export interface SyntaxNode {

    // référence directe à un autre node
    nodeType?: string | SyntaxNode;

    name?: string;
    description?: string;

    children?: {[key: string]: (string | SyntaxNode) };
    list?: {[key: string]: (string | SyntaxNode)};
    blockReference?: string;

    // nom temporaire
    repetition?: string;

    breakAfter?: boolean;
    indentAfter?: boolean;

    definitionClass?: any;
}