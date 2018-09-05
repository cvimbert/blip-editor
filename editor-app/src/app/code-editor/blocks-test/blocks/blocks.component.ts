import { Component, OnInit } from '@angular/core';
import {BlockData} from "../block-data.class";
import {BlockDataInterface} from "../block-data.interface";
import {BankItemInterface} from "../bank-item.interface";
import {BlocksService} from "../blocks.service";
import {BasicTypes} from "../basic-types.class";
import {SyntaxDeclaration} from "../../../syntax/syntax-declaration.class";
import {
    baseDictionary, blocksDictionary, blocksSet1, blocksSet2, blocksSet3,
    nodesDictionary
} from "../../../syntax/syntax";
import {SyntaxCheckResult} from "../../../syntax/syntax-check-result.class";

@Component({
    selector: 'app-blocks',
    templateUrl: './blocks.component.html',
    styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

    data: BlockDataInterface[];
    consolidatedData: BlockData[] = [];

    bankItems: BankItemInterface[];

    constructor(
        private blocksService: BlocksService
    ) {

        const declaration: SyntaxDeclaration = new SyntaxDeclaration(
            [baseDictionary, nodesDictionary],
            blocksDictionary
        );

        //let res1: number = declaration.check(blocksSet1, nodesDictionary["SpriteDefinition"]);
        //console.log(res1);

        //let res2: number = declaration.check(blocksSet2, nodesDictionary["SpriteDefinition"]);
        //console.log(res2);

        let res3: SyntaxCheckResult[] = declaration.check(blocksSet1, nodesDictionary["SpriteDefinition"]);
        console.log(res3);

        this.bankItems = [
            {
                type: "t1",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: "t2",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: "t3",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: "imageFileReference",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: "number",
                backgroundColor: "#99d83e",
                fontColor: "#ffffff",
                valueProvider: () => {
                    return this.blocksService.openValueModal(BasicTypes.NUMBER);
                },
                textBuilder: (value: number) => {
                    return String(value);
                }
            },
            {
                type: "string",
                backgroundColor: "#99d83e",
                fontColor: "#ffffff",
                valueProvider: () => {
                    return this.blocksService.openValueModal(BasicTypes.STRING);
                },
                textBuilder: (value: string) => {
                    return "\"" + value + "\"";
                }
            },
            {
                type: "boolean",
                backgroundColor: "#99d83e",
                fontColor: "#ffffff",
                valueProvider: () => {
                    return this.blocksService.openValueModal(BasicTypes.BOOLEAN);
                },
                textBuilder: (value: boolean) => {
                    return String(value);
                }
            },
            {
                type: "if (",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: ")",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff",
                lineBreak: true
            },
            {
                type: "condition",
                backgroundColor: "#99d83e",
                fontColor: "#ffffff"
            },
            {
                type: "{",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff",
                lineBreak: true
            },
            {
                type: "}",
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff",
                lineBreak: true
            },
            {
                type: "object1",
                backgroundColor: "#99d83e",
                fontColor: "#ffffff"
            },
            {
                type: ".",
                backgroundColor: "#ff6e4b",
                fontColor: "#ffffff"
            },
            {
                type: "currentValue",
                backgroundColor: "#ffbb05",
                fontColor: "#ffffff"
            },
            {
                type: "===",
                backgroundColor: "#ff6e4b",
                fontColor: "#ffffff"
            },
            {
                type: ";",
                lineBreak: true,
                backgroundColor: "#1fa4ff",
                fontColor: "#ffffff"
            },
            {
                type: "7",
                backgroundColor: "#67ce00",
                fontColor: "#ffffff",
            },
        ];

        this.bankItems.forEach(item => {
            this.blocksService.bankItemsByName[item.type] = item;
        });

        this.data = [
            /*{
                mainText: "if (",
                backgroundColor: "#1fa4ff"
            },
            {
                mainText: "condition1",
                backgroundColor: "#99d83e"
            },
            {
                mainText: ")",
                lineJump: true,
                backgroundColor: "#1fa4ff"
            },
            {
                mainText: "{",
                lineJump: true,
                backgroundColor: "#1fa4ff"
            },
            {
                mainText: "object1",
                backgroundColor: "#99d83e"
            },
            {
                mainText: ".",
                backgroundColor: "#ff6e4b"
            },
            {
                mainText: "currentValue",
                backgroundColor: "#ffbb05"
            },
            {
                mainText: "===",
                backgroundColor: "#ff6e4b"
            },
            {
                mainText: "7",
                backgroundColor: "#67ce00"
            },
            {
                mainText: ";",
                lineJump: true,
                backgroundColor: "#1fa4ff"
            },
            {
                mainText: "}",
                backgroundColor: "#1fa4ff"
            }*/
        ];

        this.data.forEach(item => {
            this.consolidatedData.push(new BlockData(item));
        });
    }

    ngOnInit() {
    }

}
