import {BlockDefinition} from "../../syntax/block-definition.interface";

export class BlockData {

    mainText: string;
    lineJump: boolean;
    type: string;
    value: any;
    class: string;
    errorAfter: boolean = true;

    constructor(data: BlockDefinition) {
        this.mainText = data.text;
        this.type = data.type;
        this.class = data.class;
        this.lineJump = data.breakAfter;
    }

}