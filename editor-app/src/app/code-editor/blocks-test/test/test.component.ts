import { Component, OnInit } from '@angular/core';
import {SyntaxDeclaration} from "../../../syntax/syntax-declaration.class";
import {simplifiedBlocksDictionary, simplifiedDictionary} from "../../../syntax/simplified-syntax";
import {BlockUnit} from "../../../syntax/block-unit.interface";
import {SyntaxCheckCompleteResult} from "../../../syntax/syntax-check-complete-result.interface";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        const resp: BlockUnit[] = [
            {
                type: "a"
            },
            {
                type: "s1"
            },
            /*{
                type: "s2"
            },*/
            {
                type: "b"
            }
        ];

        const declaration: SyntaxDeclaration = new SyntaxDeclaration([simplifiedDictionary], simplifiedBlocksDictionary);

        const res: SyntaxCheckCompleteResult = declaration.parseWithErrorManagement(resp, "Main");
        console.log(res);
    }

}
