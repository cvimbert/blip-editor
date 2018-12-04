import {SyntaxCheckResult} from "./syntax-check-result.class";
import {SyntaxCompletion} from "./syntax-completion.enum";

export class SyntaxEvaluation {

    completion: SyntaxCompletion;
    results: SyntaxCheckResult[];

    constructor(
        public index: number
    ) {}
}