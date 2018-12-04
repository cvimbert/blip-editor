import {SyntaxNode} from "./syntax-node.interface";
import {SyntaxCompletion} from "./syntax-completion.enum";

export class SyntaxCheckResult {

    children: {[key: string]: SyntaxCheckResult[]} = {};
    type: string;
    value: any = null;
    startIndex: number;
    resultDefinitionObject: any;

    // ajout crucial
    completion: SyntaxCompletion;

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

    get childrenCount(): number {
        return Object.keys(this.children).length;
    }

    getValues(path: string): any[] {
        const pathElems: string[] = path.split("/");
        return this.getSyntaxResult(pathElems).map(result => result.value);
    }

    getDefinitions(path: string): any[] {
        const pathElems: string[] = path.split("/");
        return this.getSyntaxResult(pathElems)
            .filter(result => result.resultDefinitionObject !== undefined)
            .map(result => result.resultDefinitionObject);
    }

    getFirstDefinition(path: string): any {
        const definitions: any[] = this.getDefinitions(path);
        return definitions.length > 0 ? definitions[0]: null;
    }

    getChildren(path: string): SyntaxCheckResult[] {
        const pathElems: string[] = path.split("/");
        return this.getSyntaxResult(pathElems);
    }

    getFirstChild(path: string): SyntaxCheckResult {
        return this.getChildren(path)[0];
    }

    getFirstValue(path: string): any {
        let values: any[] = this.getValues(path);
        return values.length > 0 ? values[0] : null;
    }

    hasValue(path: string): boolean {
        let values: any[] = this.getValues(path);
        return values.length > 0;
    }

    hasChild(path: string) {
        let children: SyntaxCheckResult[] = this.getChildren(path);
        return children.length > 0;
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