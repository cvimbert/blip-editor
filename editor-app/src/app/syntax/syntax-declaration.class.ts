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

    parse(
        blockUnits: BlockUnit[],
        checkedNodeName: string,
    ): SyntaxCheckResult[] {

        const res: SyntaxCheckResult[] = this.baseCheck(blockUnits, this.completeSyntaxNodesDictionary[checkedNodeName]);

        if (res) {
            return (res[res.length - 1].index < blockUnits.length) ? null : res;
        } else {
            return null;
        }
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
                let currentRes: SyntaxCheckResult[] = this.baseCheck(blockUnits, <SyntaxNode>currentNode.children[key], index);

                if (currentRes !== null) {
                    // on met à jour le résultat
                    result.index = currentRes[currentRes.length - 1].index;
                    result.pushChildrenArray(key, currentRes);
                    return result;
                }
            }

            return null;

        } else if (currentNode.list) {

            let subIndex: number = index;

            for (let key in currentNode.list) {
                // on check l'intégralité des children, qui doivent tous retourner true
                let currRes: SyntaxCheckResult[] = <SyntaxCheckResult[]>this.baseCheck(blockUnits, <SyntaxNode>currentNode.list[key], subIndex);

                if (currRes === null) {
                    return null;
                }

                if (currRes.length > 0) {
                    if (currRes[currRes.length - 1].index !== subIndex) {
                        result.pushChildrenArray(key, currRes);
                    }

                    subIndex = currRes[currRes.length - 1].index;
                }

            }

            // attention, pas forcément bon dans sa logique
            //return subIndex;
            result.index = subIndex;
            //return result;

            // TODO: déplacer la vérification de fin de check à un endroit plus global
            /*if (blockUnits[subIndex]) {
                return null;
            } else {*/
                return result;
            //}
            //return !blockUnits[subIndex] ? subIndex : null;

        } else if (currentNode.nodeType) {

            return this.unitCheck(blockUnits, this.completeSyntaxNodesDictionary[<string>currentNode.nodeType], index);

        } else if (currentNode.blockReference) {

            if (blockUnits[index].type === currentNode.blockReference) {

                result.type = currentNode.blockReference;

                // et la valeur !!
                // result.value
                result.value = blockUnits[index].value;

                result.index++;
                return result;
            } else {
                return null;
            }
        }
    }

    unitCheckAndCreation(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0
    ): SyntaxCheckResult {
        let res: SyntaxCheckResult = this.unitCheck(blockUnits, checkedNode, index);

        if (res) {
            if (checkedNode.definitionClass) {
                res.resultDefinitionObject = new checkedNode.definitionClass(res);
            }
        }

        return res;
    }

    baseCheck(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0
        ): SyntaxCheckResult[] {

        switch (checkedNode.iterator) {
            case "+":
            case "*":

                let resArr: SyntaxCheckResult[] = [];

                let res: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, index);

                if (res === null) {
                    return checkedNode.iterator === "*" ? resArr : null;
                }

                resArr.push(res);

                while (res !== null) {
                    let newRes: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, res.index);

                    if (newRes === null) {
                        return resArr;
                    }

                    resArr.push(newRes);
                    res = newRes;
                }

                break;

            case "?":
                // Zero ou une fois
                resArr = [];

                // il doit y avoir une première fois ou non
                res = this.unitCheckAndCreation(blockUnits, checkedNode, index);

                if (res === null) {
                    return resArr;
                }

                resArr.push(res);

                // mais pas de seconde !
                let nres: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, res.index);

                return (nres !== null) ? null : resArr;

            default:
                let resVal: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, index);
                return resVal === null ? null : [resVal];
        }
    }
}