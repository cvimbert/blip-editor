import {SyntaxCheckResult} from "./syntax-check-result.class";
import {SyntaxCheckError} from "./syntax-check-error.class";

export interface SyntaxCheckCompleteResult {
    result: SyntaxCheckResult[];
    error: SyntaxCheckError;
}