import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {SyntaxNode} from "./syntax-node.interface";
import {BlockUnit} from "./block-unit.interface";
import {SyntaxCheckResult} from "./syntax-check-result.class";

export class SyntaxDeclaration {

    private completeSyntaxNodesDictionary: {[key: string]: SyntaxNode} = {};

    constructor(
        syntaxDictionaries: SyntaxNodesDictionary[],
        private blocksDictionary: BlockDefinitionsDictionary
    ) {
        syntaxDictionaries.forEach(dict => {
            for (let key in dict) {
                this.completeSyntaxNodesDictionary[key] = dict[key];
            }
        });

        console.log(this);
    }

    verifyIntegrity() {

    }

    check(
        blockUnits: BlockUnit[],
        checkedNode: string | SyntaxNode,
        index: number = 0,
        currentRes: SyntaxCheckResult[] = []
    ): boolean {
        //console.log("check");

        let currentNode: SyntaxNode;

        if (typeof checkedNode === "object") {
            currentNode = checkedNode;
        } else {
            currentNode = this.completeSyntaxNodesDictionary[checkedNode];
        }

        // un node ne peut contenir que : list, children ou blockReference, ou nodeType
        if (currentNode.children) {

        } else if (currentNode.list) {

            let res: { [key: string]: boolean } = {};
            let subIndex: number = index;

            for (let key in currentNode.list) {
                // on check l'intégralité des children, qui doivent tous retourner true
                let currRes: boolean = this.check(blockUnits, currentNode.list[key], subIndex);

                if (!currRes) {
                    return false;
                }

                res[key] = currRes;
                subIndex++;
            }

            console.log(res);

            // attention, pas forcément bon dans sa logique
            return !blockUnits[subIndex];

        } else if (currentNode.nodeType) {

        } else if (currentNode.blockReference) {

            if (blockUnits[index].type === currentNode.blockReference) {

                // à supprimer définitivement, ne devrait plus être utile
                /*if (blockUnits.length > index + 1) {
                    return this.check(blockUnits, null, index + 1);
                } else {
                    return true;
                }*/

                return true;
            } else {
                return false;
            }
        }
    }
}