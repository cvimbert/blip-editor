import {SyntaxCheckResult} from "../syntax-check-result.class";

export class SimpleNumericValueDefinition {

    value: number;

    constructor(
        result: SyntaxCheckResult
    ) {
        console.log("SIMPLE VALUE RESULT");

        if (result.hasChild("basic")) {
            this.value = result.getFirstValue("basic");
        } else if (result.hasChild("inPar")) {
            this.value = result.getFirstDefinition("inPar/numValue").value;
        }

        console.log(this.value);
    }
}