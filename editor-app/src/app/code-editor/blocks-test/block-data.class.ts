import {BlockDataInterface} from "./block-data.interface";
import {BlockDefinition} from "../../syntax/block-definition.interface";

export class BlockData {

    mainText: string;
    lineJump: boolean;
    type: string;
    value: any;

    constructor(data: BlockDefinition) {
        this.mainText = data.text;
        this.type = data.type;
    }

}