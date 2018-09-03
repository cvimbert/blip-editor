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
    ): number {

        let currentNode: SyntaxNode;

        if (typeof checkedNode === "object") {
            currentNode = checkedNode;
        } else {
            currentNode = this.completeSyntaxNodesDictionary[checkedNode];
        }

        if (!blockUnits[index]) {
            return -1;
        }

        // un node ne peut contenir que : list, children ou blockReference, ou nodeType
        if (currentNode.children) {

            for (let key in currentNode.children) {
                let currentRes: number = this.checkWithIteration(blockUnits, <SyntaxNode>currentNode.children[key], index);

                if (currentRes > -1) {
                    return currentRes;
                }
            }

            return -1;

        } else if (currentNode.list) {

            let res: { [key: string]: number } = {};
            let subIndex: number = index;

            for (let key in currentNode.list) {
                // on check l'intégralité des children, qui doivent tous retourner true
                let currRes: number = this.checkWithIteration(blockUnits, <SyntaxNode>currentNode.list[key], subIndex);

                if (currRes === -1) {
                    return -1;
                }

                res[key] = currRes;
                subIndex = currRes;
            }

            console.log(res);

            // attention, pas forcément bon dans sa logique
            //return subIndex;
            return !blockUnits[subIndex] ? subIndex : -1;

        } else if (currentNode.nodeType) {

        } else if (currentNode.blockReference) {

            if (blockUnits[index].type === currentNode.blockReference) {

                // à supprimer définitivement, ne devrait plus être utile
                /*if (blockUnits.length > index + 1) {
                    return this.check(blockUnits, null, index + 1);
                } else {
                    return true;
                }*/

                return index + 1;
            } else {
                return -1;
            }
        }
    }

    checkWithIteration(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0,
        currentRes: SyntaxCheckResult[] = [],
        ) {
        switch (checkedNode.repetition) {
            case "+":
            case "*":
                // Zero ou plus
                // si on a zéro, n'invalide pas l'expression, on retourne l'index (même si 0)
                let res: number = this.check(blockUnits, checkedNode, index);

                if (res === -1) {
                    return checkedNode.repetition === "*" ? index : -1;
                }

                while (res !== -1) {
                    let newRes: number = this.check(blockUnits, checkedNode, res);

                    if (newRes === -1) {
                        return res;
                    }

                    res = newRes;
                }

                // à vérifier, mais à priori pas utile
                return res;

            case "?":
                // Zero ou une fois

                // il doit y avoir une première fois ou non
                res = this.check(blockUnits, checkedNode, index);

                if (res === -1) {
                    return index;
                }

                // mais pas de seconde !
                let nres: number = this.check(blockUnits, checkedNode, res);

                return (nres > -1) ? -1 : res;

            default:
                return this.check(blockUnits, checkedNode, index);
        }
    }
}