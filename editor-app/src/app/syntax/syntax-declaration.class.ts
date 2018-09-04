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
    }

    verifyIntegrity() {

    }

    unitCheck(
        blockUnits: BlockUnit[],
        checkedNode: string | SyntaxNode,
        index: number = 0
    ): SyntaxCheckResult {

        let result: SyntaxCheckResult = new SyntaxCheckResult(index);
        let currentNode: SyntaxNode;

        if (typeof checkedNode === "object") {
            currentNode = checkedNode;
        } else {
            currentNode = this.completeSyntaxNodesDictionary[checkedNode];
        }

        if (!blockUnits[index]) {
            return null;
        }

        // un node ne peut contenir que : list, children ou blockReference, ou nodeType
        if (currentNode.children) {

            for (let key in currentNode.children) {
                let currentRes: SyntaxCheckResult = this.check(blockUnits, <SyntaxNode>currentNode.children[key], index);

                if (currentRes !== null) {
                    // on met à jour le résultat
                    result.index = currentRes.index;
                    result.pushChild(key, currentRes);
                    return result;
                }
            }

            return null;

        } else if (currentNode.list) {

            let subIndex: number = index;

            for (let key in currentNode.list) {
                // on check l'intégralité des children, qui doivent tous retourner true
                let currRes: SyntaxCheckResult = this.check(blockUnits, <SyntaxNode>currentNode.list[key], subIndex);

                if (currRes === null) {
                    return null;
                }

                if (currRes.index !== subIndex) {
                    result.pushChild(key, currRes);
                }

                subIndex = currRes.index;
            }

            // attention, pas forcément bon dans sa logique
            //return subIndex;
            result.index = subIndex;
            return result;
            //return !blockUnits[subIndex] ? subIndex : null;

        } else if (currentNode.nodeType) {

        } else if (currentNode.blockReference) {

            if (blockUnits[index].type === currentNode.blockReference) {

                result.type = currentNode.blockReference;

                // et la valeur !!
                // result.value

                result.index++;
                return result;
            } else {
                return null;
            }
        }
    }

    check(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0
        ): SyntaxCheckResult {

        switch (checkedNode.iterator) {
            case "+":
            case "*":

                let res: SyntaxCheckResult = this.unitCheck(blockUnits, checkedNode, index);

                if (res === null) {
                    return checkedNode.iterator === "*" ? res : null;
                }

                while (res !== null) {
                    let newRes: SyntaxCheckResult = this.unitCheck(blockUnits, checkedNode, res.index);

                    if (newRes === null) {
                        return res;
                    }

                    res = newRes;
                }

                // à vérifier, mais à priori pas utile
                return res;

            case "?":
                // Zero ou une fois

                // il doit y avoir une première fois ou non
                res = this.unitCheck(blockUnits, checkedNode, index);

                if (res === null) {
                    return res;
                }

                // mais pas de seconde !
                let nres: SyntaxCheckResult = this.unitCheck(blockUnits, checkedNode, res.index);

                return (nres !== null) ? null : res;

            default:
                return this.unitCheck(blockUnits, checkedNode, index);
        }
    }
}