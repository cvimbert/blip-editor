import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {BlockUnit} from "./block-unit.interface";
import {SpriteDefinition} from "./definitions/sprite-definition.class";
import {NumericValueDefinition} from "./definitions/numeric-value-definition.class";
import {SimpleNumericValueDefinition} from "./definitions/simple-numeric-value-definition.class";
import {ArithmeticOperatorDefinition} from "./definitions/arithmetic-operator-definition.class";

export const blocksDictionary: BlockDefinitionsDictionary = {
    imageFileReference: {
        type: "files",
        text: "image",
        value: "filepath"
    },
    numberValue: {
        type: "basic-values",
        text: "number",
        valueProvider: "number"
    },
    booleanValue: {
        type: "basic-values",
        text: "boolean",
        valueProvider: "boolean"
    },
    stringValue: {
        type: "basic-values",
        text: "string",
        valueProvider: "string",
        textProvider: (value: string) => {
            return '"' + value + '"';
        }
    },
    ifOpener: {
        type: "basic",
        text: "if ("
    },
    leftParenthesis: {
        type: "basic",
        text: "("
    },
    rightParenthesis: {
        type: "basic",
        text: ")"
    },
    leftBracket: {
        type: "basic",
        text: "{",
        breakAfter: true
    },
    rightBracket: {
        type: "basic",
        text: "}",
        breakAfter: true
    },
    conditionBlock: {
        type: "condition",
        text: "condition"
    },
    elseIfOpener: {
        type: "basic",
        text: "else if ("
    },
    elseBlock: {
        type: "basic",
        text: "else"
    },
    codeBlock: {
        type: "code",
        text: "codeBlock",
        breakAfter: true
    },
    booleanAnd: {
        // temp, pour la couleur rouge
        type: "files",
        text: "&&",
    },
    booleanOr: {
        // temp, aussi pour la couleur rouge
        type: "files",
        text: "||"
    },
    less: {
        type: "basic-values",
        text: "<"
    },
    lessOrEqual: {
        type: "basic-values",
        text: "<="
    },
    moreOrEqual: {
        type: "basic-values",
        text: ">="
    },
    more: {
        type: "basic-values",
        text: ">"
    },
    equal: {
        type: "basic-values",
        text: "==="
    },
    different: {
        type: "basic-values",
        text: "!=="
    },
    addition: {
        type: "files",
        text: "+"
    },
    subtraction: {
        type: "files",
        text: "-"
    },
    multiplication: {
        type: "files",
        text: "*"
    },
    division: {
        type: "files",
        text: "/"
    }

};

export const baseDictionary: SyntaxNodesDictionary = {

};

export const nodesDictionary: SyntaxNodesDictionary = {
    ImageFileReference: {
        blockReference: "imageFileReference"
    },
    NumericValue: {
        definitionClass: NumericValueDefinition,
        list: {
            baseExp: {
                nodeType: "BasicNumericValue"
            },
            extension: {
                iterator: "*",
                list: {
                    operator: {
                        nodeType: "ArithmeticOperator"
                    },
                    val: {
                        nodeType: "BasicNumericValue"
                    }
                }
            }
        }
    },
    BasicNumericValue: {
        description: "Numeric value",
        definitionClass: SimpleNumericValueDefinition,
        children: {
            basic: {
                blockReference: "numberValue"
            },
            inPar: {
                list: {
                    opening: {
                        blockReference: "leftParenthesis"
                    },
                    numValue: {
                        nodeType: "NumericValue"
                    },
                    closing: {
                        blockReference: "rightParenthesis"
                    }
                }
            }
        }
    },
    ArithmeticOperator: {
        description: "ArithmeticOperator",
        definitionClass: ArithmeticOperatorDefinition,
        children: {
            addition: {
                blockReference: "addition"
            },
            subtraction: {
                blockReference: "subtraction"
            },
            multiplication: {
                blockReference: "multiplication"
            },
            division: {
                blockReference: "division"
            }
        }
    },
    NumberValue: {
        blockReference: "numberValue"
    },
    StringValue: {
        blockReference: "stringValue"
    },
    BooleanValue: {
        blockReference: "booleanValue"
    },
    Value: {
        description: "value",
        children: {
            boolean: {
                nodeType: "BooleanValue"
            },
            string: {
                nodeType: "StringValue"
            },
            number: {
                nodeType: "NumberValue"
            }
        }
    },
    ComparisonOperator: {
        description: "Comparison operator",
        children: {
            less: {
                blockReference: "less"
            },
            lessOrEqual: {
                blockReference: "lessOrEqual"
            },
            more: {
                blockReference: "more"
            },
            moreOrEqual: {
                blockReference: "moreOrEqual"
            },
            equal: {
                blockReference: "equal"
            },
            different: {
                blockReference: "different"
            }
        }
    },
    CompleteBooleanExpression: {
        description: "complete boolean expression",
        list: {
            baseExp: {
                nodeType: "BooleanEvaluation"
            },
            extension: {
                nodeType: "BooleanEvaluationExtension",
                iterator: "*"
            }
        }
    },
    BooleanOperator: {
        description: "boolean operator",
        children: {
            and: {
                blockReference: "booleanAnd"
            },
            or: {
                blockReference: "booleanOr"
            }
        }
    },
    BooleanEvaluation: {
        description: "boolean evaluation",
        children: {
            condition: {
                blockReference: "conditionBlock"
            },
            boolean: {
                nodeType: "BooleanValue"
            },
            numberComparison: {
                nodeType: "NumbersComparison"
            },
            withPar: {
                nodeType: "BooleanExpressionInParenthesis"
            }
        }
    },
    BooleanExpressionInParenthesis: {
        description: "",
        list: {
            lp: {
                blockReference: "leftParenthesis"
            },
            exp: {
                nodeType: "CompleteBooleanExpression"
            },
            rp: {
                blockReference: "rightParenthesis"
            }
        }
    },
    BooleanEvaluationExtension: {
        description: "boolean evaluation extension",
        list: {
            operator: {
                nodeType: "BooleanOperator"
            },
            expression: {
                nodeType: "BooleanEvaluation"
            }
        }
    },
    NumbersComparison: {
        description: "numbers comparison",
        list: {
            value1: {
                nodeType: "NumberValue"
            },
            operator: {
                nodeType: "ComparisonOperator"
            },
            value2: {
                nodeType: "NumberValue"
            }
        }
    },
    SpriteDefinition: {
        description: "Une définition de sprite...",
        definitionClass: SpriteDefinition,
        list: {
            fileref: {
                blockReference: "imageFileReference",
                name: "Fichier image"
            },
            xpos: {
                blockReference: "numberValue",
                name: "X"
            },
            ypos: {
                blockReference: "numberValue",
                name: "Y"
            }
        }
    },
    If: {
        description: "Un if de base",
        list: {
            startIf: {
                blockReference: "ifOpener",
            },
            booleanEvaluation: {
                nodeType: "CompleteBooleanExpression",
                name: "Evaluation booléenne"
            },
            endIf: {
                blockReference: "rightParenthesis"
            },
            openBlock: {
                blockReference: "leftBracket",
                // breakAfter: true
            },
            codeBlock: {
                nodeType: "CodeBlock",
                iterator: "*",
                // breakAfter: true
            },
            closeBlock: {
                blockReference: "rightBracket",
                // breakAfter: true
            },
            elseIfComplement: {
                nodeType: "ElseIfComplement",
                iterator: "*"
            },
            elseComplement: {
                nodeType: "ElseComplement",
                iterator: "*"
            }
        }
    },
    ElseIfComplement: {
        description: "Else if complement",
        list: {
            elseIfOpener: {
                blockReference: "elseIfOpener"
            },
            condition: {
                nodeType: "CompleteBooleanExpression"
            },
            endIf: {
                blockReference: "rightParenthesis"
            },
            openBlock: {
                blockReference: "leftBracket",
                // breakAfter: true
            },
            codeBlock: {
                nodeType: "CodeBlock",
                iterator: "*",
                // breakAfter: true
            },
            closeBlock: {
                blockReference: "rightBracket",
                // breakAfter: true
            }
        }
    },
    ElseComplement: {
        description: "Else complement",
        list: {
            else: {
                blockReference: "elseBlock"
            },

            openBlock: {
                blockReference: "leftBracket",
                // breakAfter: true
            },
            codeBlock: {
                nodeType: "CodeBlock",
                iterator: "*"
            },
            closeBlock: {
                blockReference: "rightBracket",
                // breakAfter: true
            },
        }
    },
    CodeBlock: {
        description: "code block",
        blockReference: "codeBlock"
    }
};

export const ifTest: BlockUnit[] = [
    {
        type: "ifOpener"
    },
    {
        type: "conditionBlock"
    },
    {
        type: "rightParenthesis"
    },
    {
        type: "leftBracket"
    },
    {
        type: "codeBlock"
    },
    {
        type: "rightBracket"
    },
    {
        type: "elseIfOpener"
    },
    {
        type: "conditionBlock"
    },
    {
        type: "rightParenthesis"
    },
    {
        type: "leftBracket"
    },
    {
        type: "codeBlock"
    },
    {
        type: "rightBracket"
    },
    {
        type: "elseIfOpener"
    },
    {
        type: "conditionBlock"
    },
    {
        type: "rightParenthesis"
    },
    {
        type: "leftBracket"
    },
    {
        type: "codeBlock"
    },
    {
        type: "rightBracket"
    },
    {
        type: "elseBlock"
    },
    {
        type: "leftBracket"
    },
    {
        type: "codeBlock"
    },
    {
        type: "rightBracket"
    }
];

export const blocksSet1: BlockUnit[] = [
    {
        type: "imageFileReference",
        value: "Chemin vers le fichier machin"
    },
    {
        type: "numberValue",
        value: 45
    },
    {
        type: "numberValue",
        value: 77
    }
];