import {BlockWithValue} from "./block-with-value.interface";

export interface MultiBlocksDeclaration {
    text: string;
    blocks: (string | BlockWithValue)[];
}