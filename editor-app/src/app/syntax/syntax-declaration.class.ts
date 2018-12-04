import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {SyntaxNode} from "./syntax-node.interface";
import {BlockUnit} from "./block-unit.interface";
import {SyntaxCheckResult} from "./syntax-check-result.class";
import {SyntaxCheckError} from "./syntax-check-error.class";
import {SyntaxCheckCompleteResult} from "./syntax-check-complete-result.interface";
import {SyntaxStack} from "./syntax-stack.class";
import {SyntaxEvaluation} from "./syntax-evaluation.class";
import {SyntaxCompletion} from "./syntax-completion.enum";

export class SyntaxDeclaration {

    private completeSyntaxNodesDictionary: {[key: string]: SyntaxNode} = {};

    constructor(
        syntaxDictionaries: SyntaxNodesDictionary[],
        public blocksDictionary: BlockDefinitionsDictionary
    ) {
        syntaxDictionaries.forEach(dict => {
            for (let key in dict) {
                this.completeSyntaxNodesDictionary[key] = dict[key];
            }
        });
    }

    verifyIntegrity() {

    }

    parseWithErrorManagement(
        blockUnits: BlockUnit[],
        checkedNodeName: string
    ): SyntaxCheckCompleteResult {
        const error: SyntaxCheckError = new SyntaxCheckError();

        return {
            result: this.parse(blockUnits, checkedNodeName, error),
            error: error
        }
    }

    getMeanCompletetionByResult(result: SyntaxCheckResult[], iterator: string = ""): SyntaxCompletion {
        const completions: SyntaxCompletion[] = result.map(cmpRes => cmpRes.completion);
        return this.getMeanCompletion(completions, iterator);
    }


    // Sûrement pas correct, à vérifier
    getMeanCompletion(completions: SyntaxCompletion[] | {[key: string]: SyntaxCompletion}, iterator: string = ""): SyntaxCompletion {
        let hasComplete = false;
        let hasIncomplete = false;
        let hasEmpty = false;

        //console.log("completions", completions);

        let compArr: SyntaxCompletion[] = Array.isArray(completions) ? completions : Object.values(completions);

        // cas à vérifier
        if (compArr.length === 0) {
            //console.log("empty");
            return SyntaxCompletion.EMPTY;
        }

        for (let comp of compArr) {

            if (comp === SyntaxCompletion.COMPLETE) {
                //console.log("yes");
                hasComplete = true;
                //console.log(hasComplete);
            } else if (comp === SyntaxCompletion.INCOMPLETE) {
                hasIncomplete = true;
            } else if (comp === SyntaxCompletion.EMPTY) {
                hasEmpty = true;
            }

            if (hasComplete && (hasIncomplete || hasEmpty)) {
                //console.log("incomplete");
                return SyntaxCompletion.INCOMPLETE;
            }
        }

        //console.log("check", compArr, hasIncomplete, hasIncomplete, hasEmpty);

        if (hasEmpty && !(hasIncomplete || hasIncomplete)) {
            return SyntaxCompletion.EMPTY;
        }

        if (hasComplete && !(hasIncomplete || hasEmpty)) {
            //console.log("complete !!!");
            return SyntaxCompletion.COMPLETE;
        }

        return SyntaxCompletion.INCOMPLETE;
    }

    parse(
        blockUnits: BlockUnit[],
        checkedNodeName: string,
        error: SyntaxCheckError,
    ): SyntaxCheckResult[] {

        // la fonction devient inutile, du coup
        return this.baseCheck(blockUnits, this.completeSyntaxNodesDictionary[checkedNodeName], 0, error);
    }

    unitCheck(
        blockUnits: BlockUnit[],
        checkedNode: string | SyntaxNode,
        index: number = 0,
        error: SyntaxCheckError
    ): SyntaxCheckResult {

        let result: SyntaxCheckResult = new SyntaxCheckResult(index);

        //let evaluation: SyntaxEvaluation = new SyntaxEvaluation(index);
        //evaluation.results = [result];

        let currentNode: SyntaxNode;

        if (typeof checkedNode === "object") {
            currentNode = checkedNode;
        } else {
            currentNode = this.completeSyntaxNodesDictionary[checkedNode];
        }

        if (!blockUnits[index]) {
            console.log("n'existe pas à l'index indiqué", index);

            return result;
        }

        // un node ne peut contenir que : list, children ou blockReference, ou nodeType

        if (currentNode.children) {

            for (let key in currentNode.children) {
                let currentRes: SyntaxCheckResult[] = this.baseCheck(blockUnits, <SyntaxNode>currentNode.children[key], index, error);

                // théoriquement (mais c'est à vérifier, il ne devrait y avoir qu'un seul résultat au base check
                // du moins dans le cas de 'list', où l'iterateur n'a pas de sens

                if (currentRes !== null && currentRes.length > 0 && currentRes[0].completion === SyntaxCompletion.COMPLETE) {
                    // on met à jour le résultat

                    result.index = currentRes[currentRes.length - 1].index;

                    result.pushChildrenArray(key, currentRes);
                    result.completion = SyntaxCompletion.COMPLETE;

                    // on a un résultat possible, c'est le seul que nous renvoyons
                    return result;
                }
            }

            result.completion = SyntaxCompletion.FAILURE;

            // zéro resultat
            return result;

        } else if (currentNode.list) {

            // élément clé de l'analyse syntaxique

            let subIndex: number = index;
            let indexInList: number = 0;


            // plusieurs cas possible
            // incomplete : si on a une série d'éléments à complete, et pas les suivants
            // complete : si on tous les éléments de la liste à complete (ou empty dans le cas de * et ?)
            // failure dans le cas où un des éléments de la liste retourne failure
            // failure est un cas extrème, qui devrait ne jamais arriver dans l'idéal

            const completions: {[key: string]: SyntaxCompletion} = {};
            const keys: string[] = Object.keys(currentNode.list);

            for (let key in currentNode.list) {

                // on check l'intégralité des éléments de "list", qui doivent tous retourner true pour que le noeud soit validé
                const node: SyntaxNode = <SyntaxNode>currentNode.list[key];
                const currRes: SyntaxCheckResult[] = this.baseCheck(blockUnits, node, subIndex, error);

                // les seuls cas dans lesquels currRes a une longueur supérieure à 1, c'est dans les cas des
                // itérateurs * et +

                //console.log("key", key, currRes);
                // allez, y'a plus qu'à...

                let meanCompletion: SyntaxCompletion = this.getMeanCompletetionByResult(currRes);

                /*if (key === "s") {
                    console.log("!!!!", currRes);
                }*/

                completions[key] = meanCompletion;

                // à faire dans une seconde boucle
                if (meanCompletion === SyntaxCompletion.COMPLETE) {
                    result.pushChildrenArray(key, currRes);

                    if (currRes.length > 0) {
                        subIndex = currRes[currRes.length - 1].index;
                    }
                }

                indexInList++;
            }

            console.log("completions", completions);

            const globalCompletion: SyntaxCompletion = this.getMeanCompletion(completions);
            console.log("global", globalCompletion);

            result.completion = globalCompletion;
            result.index = subIndex;
            return result;


        } else if (currentNode.nodeType) {

            return this.unitCheck(blockUnits, this.completeSyntaxNodesDictionary[<string>currentNode.nodeType], index, error);

        } else if (currentNode.blockReference) {

            // la cas le plus simple: une référence à un bloc
            // deux réponses possibles : complete ou failure

            let type: string = blockUnits[index].type;
            let subType: string = this.blocksDictionary[type].type;

            result.type = currentNode.blockReference;

            if ((subType || type) === currentNode.blockReference) {

                // succès de l'évaluation
                result.value = blockUnits[index].value;
                result.index++;
                result.completion = SyntaxCompletion.COMPLETE;
            } else {

                // bloc introuvable
                result.index = index;
                result.completion = SyntaxCompletion.INCOMPLETE;
            }

            return result;
        }
    }

    unitCheckAndCreation(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0,
        error: SyntaxCheckError
    ): SyntaxCheckResult {

        let currentNode: SyntaxNode;

        if (checkedNode.nodeType) {
            currentNode = this.completeSyntaxNodesDictionary[<string>checkedNode.nodeType];
        } else {
            currentNode = checkedNode;
        }

        let res: SyntaxCheckResult = this.unitCheck(blockUnits, currentNode, index, error);

        if (res && res.completion === SyntaxCompletion.COMPLETE) {
            if (currentNode.definitionClass) {
                res.resultDefinitionObject = new currentNode.definitionClass(res);
            }
        }

        return res;
    }

    baseCheck(
        blockUnits: BlockUnit[],
        checkedNode: SyntaxNode,
        index: number = 0,
        error: SyntaxCheckError
    ): SyntaxCheckResult[] {

        switch (checkedNode.iterator) {
            case "+":
            case "*":

                let resArr: SyntaxCheckResult[] = [];

                let res: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, index, error);

                if (res === null) {
                    return checkedNode.iterator === "*" ? resArr : null;
                }

                resArr.push(res);

                while (res !== null) {
                    let newRes: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, res.index, error);

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
                res = this.unitCheckAndCreation(blockUnits, checkedNode, index, error);

                if (res === null) {
                    return resArr;
                }

                resArr.push(res);

                // mais pas de seconde !
                let nres: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, res.index, error);

                return (nres.completion === SyntaxCompletion.COMPLETE) ? resArr : [];

            default:
                if (index < blockUnits.length) {
                    let resVal: SyntaxCheckResult = this.unitCheckAndCreation(blockUnits, checkedNode, index, error);
                    return [resVal];
                } else {
                    return [];
                }
        }
    }

    getNodeDirectChildren(nodeName: string, include: string[] = []): string[] {

        console.log(include);

        const children: string[] = [];

        const node: SyntaxNode = this.completeSyntaxNodesDictionary[nodeName];

        if (node.list) {
            for (let key in node.list) {

                const ref: string = (<SyntaxNode>node.list[key]).blockReference;

                if (ref) {
                    children.push(ref)
                }

                if (include.indexOf(key) !== -1) {
                    const type: string = (<SyntaxNode>node.list[key]).nodeType;
                    console.log(type);
                    children.push(...this.getNodeDirectChildren(type));
                }
            }
        }

        return children;
    }
}