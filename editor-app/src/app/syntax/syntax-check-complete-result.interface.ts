import {SyntaxCheckResult} from "./syntax-check-result.class";
import {SyntaxCheckError} from "./syntax-check-error.class";
import {SyntaxStack} from "./syntax-stack.class";

export interface SyntaxCheckCompleteResult {
    result: SyntaxCheckResult[];
    error: SyntaxCheckError;
    stack: SyntaxStack;
}