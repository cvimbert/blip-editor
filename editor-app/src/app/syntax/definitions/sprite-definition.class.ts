import {SyntaxNode} from "../syntax-node.interface";
import {BlockUnit} from "../block-unit.interface";
import {SyntaxCheckResult} from "../syntax-check-result.class";

export class SpriteDefinition {

    fileRef: string;
    xpos: number;
    ypos: number;

    constructor(
        private result: SyntaxCheckResult
    ) {
        this.fileRef = result.getFirstValue("fileref");
        this.xpos = result.getFirstValue("xpos");
        this.ypos = result.getFirstValue("ypos");
    }
}