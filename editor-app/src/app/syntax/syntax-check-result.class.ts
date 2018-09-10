import {SyntaxNode} from "./syntax-node.interface";

export class SyntaxCheckResult {

    children: {[key: string]: SyntaxCheckResult[]} = {};
    type: string;
    value: any = null;
    startIndex: number;
    resultDefinitionObject: any;

    errorNode: SyntaxNode;

    constructor(
        public index: number
    ) {
        this.startIndex = index;
    }

    setError(node: SyntaxNode) {
        this.errorNode = node;
    }

    pushChildrenArray(key: string, arr: SyntaxCheckResult[]) {
        this.children[key] = arr;
    }

    get endIndex(): number {
        return this.index - 1;
    }

    getValue(path: string): any[] {
        const pathElems: string[] = path.split("/");
        return this.getSyntaxResult(pathElems).map(result => result.value);
    }

    getFirstValue(path: string): any {
        let values: any[] = this.getValue(path);
        return values.length > 0 ? values[0] : null;
    }

    getSyntaxResult(path: string[]): SyntaxCheckResult[] {

        let resultsArray: SyntaxCheckResult[] = [this];
        resultsArray.push(this);

        for (let pathElem of path) {

            let subRes: SyntaxCheckResult[] = [];

            for (let resElem of resultsArray) {

                let res: SyntaxCheckResult[] = resElem.children[pathElem];

                if (res) {
                    subRes.push(...res);
                }
            }

            resultsArray = subRes;
        }

        return resultsArray;
    }
}