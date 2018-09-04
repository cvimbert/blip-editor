import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";
import {BlockUnit} from "./block-unit.interface";
import {SpriteDefinition} from "./definitions/sprite-definition.class";

export const blocksDictionary: BlockDefinitionsDictionary = {
    imageFileReference: {
        type: "files",
        useTextProvider: true
    },
    numberValue: {
        type: "basicValues",
        useTextProvider: true,
        useValueProvider: true
    }
};

export const baseDictionary: SyntaxNodesDictionary = {
    ImageFileReference: {
        blockReference: "imageFileReference"
    },
    NumberValue: {
        blockReference: "numberValue"
    }
};

export const nodesDictionary: SyntaxNodesDictionary = {
    TestDefinition: {
        description: "Un petite définition de test",
        children: {
            it1: {
                list: {
                    a: {
                        blockReference: "a"
                    },
                    b: {
                        blockReference: "b",
                        iterator: "*"
                    },
                    c: {
                        blockReference: "c"
                    }
                }
            },
            it2: {
                children: {
                    c: {
                        blockReference: "c"
                    }
                }
            }
        }
    },
    SpriteDefinition: {
        description: "Une définition de sprite...",
        definitionClass: SpriteDefinition,
        list: {
            fileref: {
                //nodeType: "ImageFileReference",
                blockReference: "imageFileReference",
                name: "Fichier image"
            },
            xpos: {
                //nodeType: "NumberValue",
                blockReference: "numberValue",
                name: "X"
            },
            ypos: {
                //nodeType: "NumberValue",
                blockReference: "numberValue",
                name: "Y"
            }
        }
    }
};

export const blocksSet1: BlockUnit[] = [
    {
        type: "imageFileReference"
    },
    {
        type: "numberValue",
        value: 45
    },
    {
        type: "numberValue",
        value: 89
    }
];

export const blocksSet2: BlockUnit[] = [
    {
        type: "numberValue",
        value: 45
    },
    {
        type: "imageFileReference"
    }
];

export const blocksSet3: BlockUnit[] = [
    {
        type: "a",
        value: 45
    },
    {
        type: "b",
    },
    {
        type: "b",
    },
    {
        type: "c",
        value: 45
    }
];

// déclaration "absolue"
const syntaxDeclaration = {
    // déclaration d'une feuille de l'arbre
    "imageFile": {
        description: "Une référence à un fichier image",
        blockRef: "idDuBloc"
    },
    "sprite-declaration": {
        list: {
            // id simple
            "file-ref": "imageFile",
            "x-pos": "numberValue",

            // possibilité de passer d'autres infos dans un objet ??
            "y-pos": {
                type: "numberValue",
                breakAfter: true,
                description: "La position du sprite sur x",
                name: "X"
            }
        },
        breakAfter: true
    },
    "code-line-2": {
        nodes: {
            if: {
                type: "if",
                repetition: "*",
                breakAfter: true
            },
            "simple-action": {
                description: "desc",
                list: {
                    "action-name": {
                        type: "simpleAction"
                    },
                    // si pas de nodeType, c'est la clé qui le remplace
                    "line-sep": {
                        type: "line-separator"
                    }
                },
                breakAfter: true
            }
        }
    },
    "code-block": {
        children: {
            // indexation des children par clé, pour récupération des données après parsing
            "code-lines": "code-line*"
        }
    },
    "code-line": {
        children: [
            "if*",
            ["simple-action*", "line-ending"]
        ]
    },
    "simple-action": {
        children: [
            "command-name"
        ]
    },
    "if": {
        children: [
            [
                "if-opening",
                "boolean-evaluation",
                "closing-parenthesis",
                "opening-bracket",
                "code-block",
                "closing-bracket"
            ]
        ]
    }
};