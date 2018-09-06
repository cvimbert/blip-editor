import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {BlockUnit} from "./block-unit.interface";
import {SpriteDefinition} from "./definitions/sprite-definition.class";

export const blocksDictionary: BlockDefinitionsDictionary = {
    imageFileReference: {
        type: "files",
        text: "image"
    },
    numberValue: {
        type: "basic-values",
        text: "number"
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
        text: "{"
    },
    rightBracket: {
        type: "basic",
        text: "}"
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
        text: "codeBlock"
    }
};

export const baseDictionary: SyntaxNodesDictionary = {

};

export const nodesDictionary: SyntaxNodesDictionary = {
    ImageFileReference: {
        blockReference: "imageFileReference"
    },
    NumberValue: {
        blockReference: "numberValue"
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
                nodeType: "BooleanEvaluation",
                name: "Evaluation booléenne"
            },
            endIf: {
                blockReference: "rightParenthesis"
            },
            openBlock: {
                blockReference: "leftBracket"
            },
            codeBlock: {
                nodeType: "CodeBlock"
            },
            closeBlock: {
                blockReference: "rightBracket"
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
    BooleanEvaluation: {
        description: "L'évaluation booléenne",
        children: {
            condition: {
                blockReference: "conditionBlock"
            }
        }
    },
    ElseIfComplement: {
        description: "",
        list: {
            elseIfOpener: {
                blockReference: "elseIfOpener"
            },
            condition: {
                nodeType: "BooleanEvaluation"
            },
            endIf: {
                blockReference: "rightParenthesis"
            },
            openBlock: {
                blockReference: "leftBracket"
            },
            codeBlock: {
                nodeType: "CodeBlock"
            },
            closeBlock: {
                blockReference: "rightBracket"
            }
        }
    },
    ElseComplement: {
        description: "",
        list: {
            else: {
                blockReference: "elseBlock"
            },
            openBlock: {
                blockReference: "leftBracket"
            },
            codeBlock: {
                nodeType: "CodeBlock"
            },
            closeBlock: {
                blockReference: "rightBracket"
            },
        }
    },
    CodeBlock: {
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