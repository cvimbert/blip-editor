export class SyntaxCheckResult {

    children: {[key: string]: SyntaxCheckResult} = {};
    type: string;
    value: any = null;

    startIndex: number;

    constructor(
        public index: number
    ) {
        this.startIndex = index;
    }

    pushChild(key: string, value: SyntaxCheckResult) {
        this.children[key] = value;
    }

    get endIndex(): number {
        return this.index - 1;
    }
}