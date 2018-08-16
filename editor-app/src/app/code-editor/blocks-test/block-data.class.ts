import {BlockDataInterface} from "./block-data.interface";

export class BlockData {

    mainText: string;
    color: string;
    lineJump: boolean;
    fontColor: string;
    backgroundColor: string;
    type: string;
    value: any;

    constructor(data: BlockDataInterface) {
        this.mainText = data.mainText || "";
        this.color = data.color || "#ff0000";
        this.lineJump = data.lineJump || false;
        this.fontColor = data.fontColor || "#ffffff";
        this.backgroundColor = data.backgroundColor || "#ff0000";
        this.type = data.type;
    }

}