import {SyntaxCheckResult} from "../syntax-check-result.class";

export class NumericValueDefinition {

    value: number;

    constructor(
        result: SyntaxCheckResult
    ) {
        console.log("RES", result);

        let operations: {
            operator?: string;
            operand: number
        }[] = [];

        operations.push({
            operand: result.getFirstDefinition("baseExp").value
        });

        // attention : get children ne fonctionne pas correctement
        const extensions: SyntaxCheckResult[] = result.children["extension"];

        // attention aux opérations prioritaires
        extensions.forEach(extensionResult => {
            operations.push({
                operator: extensionResult.getFirstDefinition("operator").operator,
                operand: extensionResult.getFirstDefinition("val").value
            });
        });

        // operations prioritaires
        operations.forEach((operation, index: number) => {
            switch (operation.operator) {
                case "*":
                    operations[index - 1].operand *= operation.operand;
                    break;

                case "/":
                    operations[index - 1].operand /= operation.operand;
                    break;
            }
        });

        // les autres opérations
        operations.forEach((operation, index: number) => {
            switch (operation.operator) {
                case "+":
                    operations[0].operand += operation.operand;
                    break;

                case "-":
                    operations[0].operand -= operation.operand;
                    break;
            }
        });

        this.value = operations[0].operand;
    }
}