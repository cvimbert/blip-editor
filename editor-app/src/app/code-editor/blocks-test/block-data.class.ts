import {BlockDefinition} from "../../syntax/block-definition.interface";

export class BlockData {

    mainText: string;
    lineJump: boolean;
    type: string;
    value: any;
    class: string;
    errorAfter: boolean = false;
    errorBefore: boolean = false;
    inactive: boolean = false;
    errorText: string;

    constructor(data: BlockDefinition) {
        this.mainText = data.text;
        this.type = data.itemClass;
        this.class = data.class;
        this.lineJump = data.breakAfter;
        this.value = data.value;
    }

}