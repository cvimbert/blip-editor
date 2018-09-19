import {SyntaxCheckResult} from "../syntax-check-result.class";

export class ArithmeticOperatorDefinition {

    operator: string;

    constructor(
        result: SyntaxCheckResult
    ) {
        if (result.hasChild("addition")) {
            this.operator = "+";
        } else if (result.hasChild("subtraction")) {
            this.operator = "-";
        } else if (result.hasChild("multiplication")) {
            this.operator = "*";
        } else if (result.hasChild("division")) {
            this.operator = "/";
        }
    }
}