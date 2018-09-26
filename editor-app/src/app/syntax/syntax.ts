import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {BlockUnit} from "./block-unit.interface";
import {SpriteDefinition} from "./definitions/sprite-definition.class";
import {NumericValueDefinition} from "./definitions/numeric-value-definition.class";
import {SimpleNumericValueDefinition} from "./definitions/simple-numeric-value-definition.class";
import {ArithmeticOperatorDefinition} from "./definitions/arithmetic-operator-definition.class";
import {MultiBlocksDeclarationDictionary} from "./multi-blocks-declaration-dictionary.interface";

export const blocksDictionary: BlockDefinitionsDictionary = {
    imageFileReference: {
        itemClass: "files",
        text: "image",
        value: "filepath"
    },
    numberValue: {
        itemClass: "basic-values",
        text: "number",
        valueProvider: "number",
        textProvider: (value: number) => {
            return value;
        }
    },
    booleanValue: {
        itemClass: "basic-values",
        text: "boolean",
        valueProvider: "boolean",
        textProvider: (value: string) => {
            return value;
        }
    },
    stringValue: {
        itemClass: "basic-values",
        text: "string",
        valueProvider: "string",
        textProvider: (value: string) => {
            return '"' + value + '"';
        }
    },
    if: {
        itemClass: "basic",
        text: "if...",
        nodeReference: "If"
    },
    ifElse: {
        itemClass: "basic",
        text: "if... else...",
        nodeReference: "If",
        include: ["elseComplement"]
    },
    ifOpener: {
        itemClass: "basic",
        text: "if ("
    },
    leftParenthesis: {
        itemClass: "basic",
        text: "("
    },
    rightParenthesis: {
        itemClass: "basic",
        text: ")"
    },
    leftBracket: {
        itemClass: "basic",
        text: "{",
        breakAfter: true,
        indentAfter: 1
    },
    rightBracket: {
        itemClass: "basic",
        text: "}",
        breakAfter: true,
        indentAfter: -1
    },
    conditionBlock: {
        itemClass: "condition",
        text: "condition"
    },
    elseIfOpener: {
        itemClass: "basic",
        text: "else if ("
    },
    elseBlock: {
        itemClass: "basic",
        text: "else"
    },
    codeBlock: {
        itemClass: "code",
        text: "codeBlock",
        //breakAfter: true
    },
    booleanAnd: {
        // temp, pour la couleur rouge
        itemClass: "files",
        text: "&&",
    },
    booleanOr: {
        // temp, aussi pour la couleur rouge
        itemClass: "files",
        text: "||"
    },
    less: {
        itemClass: "basic-values",
        text: "<"
    },
    lessOrEqual: {
        itemClass: "basic-values",
        text: "<="
    },
    moreOrEqual: {
        itemClass: "basic-values",
        text: ">="
    },
    more: {
        itemClass: "basic-values",
        text: ">"
    },
    equal: {
        itemClass: "basic-values",
        text: "==="
    },
    different: {
        itemClass: "basic-values",
        text: "!=="
    },
    addition: {
        type: "arithmeticOperator",
        itemClass: "files",
        text: "+",
        value: "+"
    },
    subtraction: {
        type: "arithmeticOperator",
        itemClass: "files",
        text: "-",
        value: "-"
    },
    multiplication: {
        type: "arithmeticOperator",
        itemClass: "files",
        text: "*",
        value: "*"
    },
    division: {
        // pour l'analyse syntaxique, c'est le type qui doit être utilisé, au lieu de la clé, si le type existe
        type: "arithmeticOperator",
        itemClass: "files",
        text: "/",
        value: "/"
    }
};

// à priori les multi-blocks ne devraient pas être utile
export const multiBlocks: MultiBlocksDeclarationDictionary = {
    simpleIf: {
        text: "if",
        blocks: [
            "ifOpener",
            "rightParenthesis",
            "leftBracket",
            "rightBracket"
        ]
    },
    ifElse: {
        text: "if...\nelse...",
        blocks: [
            "ifOpener",
            "rightParenthesis",
            "leftBracket",
            "rightBracket",
            "elseBlock",
            "leftBracket",
            "rightBracket"
        ]
    }
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
                        blockReference: "arithmeticOperator"
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
                nodeType: "NumericValue"
            },
            operator: {
                nodeType: "ComparisonOperator"
            },
            value2: {
                nodeType: "NumericValue"
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
        completeParsing: true,
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
                breakAfter: true,
                indentAfter: 1
            },
            codeBlock: {
                nodeType: "CodeBlock",
                iterator: "*",
                breakAfter: true,
                indentAfter: -1
            },
            closeBlock: {
                blockReference: "rightBracket",
                breakAfter: true
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
        completeParsing: true,
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
        completeParsing: true,
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