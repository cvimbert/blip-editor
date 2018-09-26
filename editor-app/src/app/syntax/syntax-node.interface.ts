import {BlockDefinition} from "./block-definition.interface";

export interface SyntaxNode {

    // référence directe à un autre node
    nodeType?: string;

    name?: string;
    description?: string;

    completeParsing?: boolean;

    children?: {[key: string]: (string | SyntaxNode) };
    list?: {[key: string]: (string | SyntaxNode)};
    blockReference?: string;

    iterator?: string;
    error?: string;

    // plus ici, à déplacer
    // breakAfter?: boolean;
    // indentAfter?: boolean;

    definitionClass?: any;
}